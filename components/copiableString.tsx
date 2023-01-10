import {ActionIcon} from '@mantine/core';
import {useClipboard} from '@mantine/hooks';
import type {FC} from 'react';
import {IconCopy} from '@tabler/icons';

const ClipboardCopyButton: FC<{
  str: string;
}> = ({str}) => {
  const clipboard = useClipboard({timeout: 500});

  return (
    <ActionIcon variant="transparent" onClick={() => clipboard.copy(str)} disabled={clipboard.copied} size="xs">
      <IconCopy />
    </ActionIcon>
  );
};

export default ClipboardCopyButton;
