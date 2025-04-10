import React from 'react'
import { Text } from '../../../../shared/ring-ui-components'
import { ProjectItem } from './ProjectItem';
import { Project } from '../../types';

export const ProjectsList = ({ projects }: { projects: Project[] }) => (
  <div className="project-container">
    {projects.length > 0 ? (
      <div>
        {projects.map(project => (
          <ProjectItem key={project.id} project={project}/>
        ))}
      </div>
    ) : (
      <Text>No projects loaded. Click Refresh Projects to load projects.</Text>
    )}
  </div>
);