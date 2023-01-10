import {ActionIcon, Group, Text} from '@mantine/core';
import {IconArrowLeft, IconArrowRight} from '@tabler/icons';
import {FC, useEffect, useState} from 'react';

const PaginationUnbounded: FC<{onChange: (page: number) => void; disableLeft: boolean; disableRight: boolean}> = ({
  onChange,
  disableRight,
  disableLeft,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => onChange(page), [page]);

  return (
    <Group>
      <ActionIcon onClick={() => setPage(page - 1)} disabled={page == 1 || disableLeft}>
        <IconArrowLeft size={24} />
      </ActionIcon>
      <Text>{page}</Text>
      <ActionIcon onClick={() => setPage(page + 1)} disabled={disableRight}>
        <IconArrowRight size={24} />
      </ActionIcon>
    </Group>
  );
};

export default PaginationUnbounded;
