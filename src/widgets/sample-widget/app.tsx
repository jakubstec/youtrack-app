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

  const fetchProjects = useCallback(async () => {
    try {
      const result = await host.fetchYouTrack('admin/projects?fields=id,name,shortName,iconUrl,description');
      setProjects(result as Project[]);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error fetching projects');
    }
  }, []);


  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);


  return (
    <div className="widget">
      <div className="heading-container">
        <Heading>YouTrack Projects</Heading>
      </div>
      
      <Panel className="panel-controls">
        <Toggle 
          size={Size.Size20}
          name="feature-flag"
          checked
          onChange={() => {}}
        >Feature flag</Toggle>
        
        <Button primary onClick={fetchProjects}>
          Refresh Projects
        </Button>
      </Panel>
      
      <div className="project-container">
        {projects.length > 0 ? (
          <div>
            {projects.map(project => (
              <div 
                key={project.id}
                className="project-item"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px',
                  margin: '12px 0',
                  borderRadius: '8px',
                  border: '1px solid var(--ring-border-color)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  backgroundColor: 'var(--ring-content-background-color)'
                }}
              >
                <img 
                  src={project.iconUrl} 
                  alt={project.name} 
                  width="40" 
                  height="40"
                  style={{marginRight: '12px', verticalAlign: 'middle'}}
                />
                <Text style={{fontSize: '16px', fontWeight: 500}}>{project.name}</Text>
                <Text>{` (${project.shortName})`}</Text>
                {project.description && (
                <div style={{marginTop: '8px', paddingLeft: '52px'}}>
                  <Text style={{color: 'var(--ring-secondary-color, #999)', fontSize: '12px', fontWeight: 500, marginBottom: '2px'}}>Description: </Text>
                  <Text style={{color: 'var(--ring-secondary-color)'}}>{project.description}</Text>
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
