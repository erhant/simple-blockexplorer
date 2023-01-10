import {Code, ScrollArea} from '@mantine/core';
import type {FC} from 'react';

const CodeView: FC<{code: string}> = ({code}) => {
  if (code == '0x') {
    return <i>No code.</i>;
  } else
    return (
      <ScrollArea
        sx={theme => ({
          height: 200,
          borderRadius: 10,
          background:
            theme.colorScheme == 'dark' ? theme.fn.lighten(theme.black, 0.15) : theme.fn.darken(theme.white, 0.05),
        })}
        p="md"
      >
        <Code sx={{overflowWrap: 'anywhere'}}>{code}</Code>
      </ScrollArea>
    );
};

export default CodeView;
