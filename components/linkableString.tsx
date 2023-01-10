import {Box, Container, Text, Group, TextInput, Button, Anchor, ActionIcon} from '@mantine/core';
import Link from 'next/link';
import {FC, ReactNode, useEffect, useState} from 'react';
import {IconSearch} from '@tabler/icons';
import ClipboardCopyButton from './copiableString';

const LinkableString: FC<{href: string; display: ReactNode; clipboard?: string}> = ({href, display, clipboard}) => {
  const linkComponent = (
    <Link href={href} passHref>
      <Anchor>{display}</Anchor>
    </Link>
  );
  if (clipboard) {
    return (
      <Group key="block hash">
        {linkComponent}
        <ClipboardCopyButton str={clipboard} />
      </Group>
    );
  } else {
    return linkComponent;
  }
};

export default LinkableString;
