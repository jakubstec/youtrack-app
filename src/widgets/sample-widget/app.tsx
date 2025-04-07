import React, {memo, useState, useCallback, useEffect} from 'react';
import Button from '@jetbrains/ring-ui-built/components/button/button';
import Toggle, { Size } from '@jetbrains/ring-ui-built/components/toggle/toggle';
import Text from '@jetbrains/ring-ui-built/components/text/text';
import Panel from '@jetbrains/ring-ui-built/components/panel/panel';
import Heading from '@jetbrains/ring-ui-built/components/heading/heading';

const host = await YTApp.register();

interface Project {
  id: string;
  name: string;
  shortName: string;
  iconUrl: string;
  description: string;
}

const AppComponent: React.FunctionComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testFlag, setTestFlag] = useState<boolean>(false);

  const fetchProjects = useCallback(async () => {
    try {
      const result = await host.fetchYouTrack('admin/projects?fields=id,name,shortName,iconUrl,description');
      setProjects(result as Project[]);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error fetching projects');
    }
  }, []);

  // unfortunately didnt manage to get this flag working :(
  const fetchTestFlag = useCallback(async () => {
    try {
      const response = await host.fetchApp('test-flag');
      const data = await (response as Response).json();
      setTestFlag(data.enabled);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error fetching test flag');
    }
  }, []);


  const updateTestFlag = useCallback(async (newValue: boolean) => {
    try {
      await host.fetchApp('test-flag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({enable: newValue})
      });
      setTestFlag(newValue);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error updating test flag');
    }
  }, []);

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
    <div className="widget">
      <div className="heading-container">
        <Heading>YouTrack Projects</Heading>
      </div>

      <Panel className="panel-controls">
        <Toggle
          size={Size.Size20}
          name="test-flag"
          checked={testFlag}
          onChange={handleToggleChange}
        >
          Test flag
        </Toggle>
        <Text>Test flag is {testFlag ? 'enabled' : 'disabled'}</Text>
        <Button primary onClick={fetchProjects}>
          Refresh Projects
        </Button>
      </Panel>

      <div className="project-container">
        {projects.length > 0 ? (
          <div>
            {projects.map(project => (
              <div className="project-item" key={project.id}>
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  width="40"
                  height="40"
                />
                <Text className="project-name">{project.name}</Text>
                <Text>{` (${project.shortName})`}</Text>
                {project.description && (
                  <div className="project-description">
                    <Text className="label">Description: </Text>
                    <Text className="text">{project.description}</Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Text>No projects loaded. Click Refresh Projects to load projects.</Text>
        )}
      </div>
    </div>
  );
};

export const App = memo(AppComponent);
