import {TextInput, ActionIcon} from '@mantine/core';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {IconSearch} from '@tabler/icons';
import {useClientContext} from '../context/client.context';

const SearchBar: FC = () => {
  const {client} = useClientContext();
  const [input, setInput] = useState('');
  const [href, setHref] = useState('');

  // update href dynamically to route the user on click
  useEffect(() => {
    setHref('');
    if (input.slice(0, 2) == '0x') {
      if (input.length == 42) {
        // input is address
        setHref('/address/' + input);
      } else if (input.length == 66) {
        // input is block / tx hash
        client
          .getTxByHash(input)
          .then(() => {
            setHref('/transaction/' + input);
          })
          .catch(() => {
            setHref('/block/' + input);
          });
      }
    } else {
      // input is a block number
      const num = parseInt(input);
      if (!Number.isNaN(num)) setHref('/block/' + num);
    }
  }, [input]);

  const isDisabled = href == '';
  // console.log(href);

  return (
    <TextInput
      sx={{width: '60%'}}
      placeholder="address / block hash / block height / transaction hash"
      value={input}
      onChange={event => setInput(event.currentTarget.value)}
      rightSection={
        <Link href={href} passHref>
          <ActionIcon disabled={isDisabled}>
            <IconSearch size={18} />
          </ActionIcon>
        </Link>
      }
    />
  );
};

export default SearchBar;
