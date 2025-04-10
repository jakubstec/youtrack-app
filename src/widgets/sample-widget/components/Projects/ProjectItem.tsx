import React from 'react'
import { Text } from '../../../../shared/ring-ui-components'
import { Project } from '../../types/index';

export const ProjectItem = ({ project }: { project: Project }) => (
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
);