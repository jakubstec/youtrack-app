import React, {memo, useState, useCallback, useEffect} from 'react';
import { AppLayout } from './components/AppLayout';
import { ToggleSection } from './components/Controls/ToggleSection';
import { ProjectsList } from './components/Projects/ProjectList';
import { Project, FlagResponse} from './types';

const host = await YTApp.register();

const AppComponent: React.FunctionComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testFlag, setTestFlag] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleError = useCallback( (error: unknown, defaultMessage: string) => {
    // eslint-disable-next-line no-console
    console.error(defaultMessage, error);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await host.fetchYouTrack('admin/projects?fields=id,name,shortName,iconUrl,description', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      setProjects(result as Project[]);
    } catch (error) {
      handleError(error, "Error fetching projects");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const fetchTestFlag = useCallback(async () => {
    try {
      const response = await host.fetchApp('backend/test-flag', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = response as FlagResponse;
      setTestFlag(data.value);
    } catch (error) {
      handleError(error, "Error fetching test flag");
      setTestFlag(false);
    }
  }, [handleError]);


  const updateTestFlag = useCallback(async (newValue: boolean) => {
    try {
      await host.fetchApp('backend/test-flag', {
        method: 'POST',
        body: JSON.stringify({value: newValue}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      setTestFlag(newValue);
    } catch (error) {
      handleError(error, "Error updating test flag");
    }
  }, [handleError]);

  const handleToggleChange = useCallback(() => {
    updateTestFlag(!testFlag);
  }, [testFlag, updateTestFlag]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchTestFlag();
  }, [fetchTestFlag]);

  return (
    <div className="app-container">
      {isLoading ? (
        <div className="loading-state">
          <p>Loading projects...</p>
        </div>
      ) : (
        <AppLayout>
          <ToggleSection 
            testFlag={testFlag}
            onToggle={handleToggleChange}
            onRefresh={fetchProjects}
          />
          <ProjectsList projects={projects}/>
        </AppLayout>
      )}
    </div>
    );
};

export const App = memo(AppComponent);
