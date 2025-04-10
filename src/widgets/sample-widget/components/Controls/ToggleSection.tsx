import React from 'react'
import { Text, Button, Toggle, Size, Panel } from '../../../../shared/ring-ui-components'

export const ToggleSection = ({
    testFlag,
    onToggle,
    onRefresh
  }: {
    testFlag: boolean;
    onToggle: () => void;
    onRefresh: () => void;
  }) => (
    <Panel className="panel-controls">
      <Toggle
        size={Size.Size20}
        name="test-flag"
        checked={testFlag}
        onChange={onToggle}
      >
        Test flag
      </Toggle>
      <Text>Test flag is {testFlag ? 'enabled' : 'disabled'}</Text>
      <Button primary onClick={onRefresh}>
        Refresh Projects
      </Button>
    </Panel>
  );