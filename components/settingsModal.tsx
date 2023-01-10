import {NumberInput, Text, ActionIcon, Modal, Stack, TextInput, Button, Title} from '@mantine/core';
import {IconSettings} from '@tabler/icons';
import {FC, useState} from 'react';
import {useClientContext} from '../context/client.context';
import KnownAddressesTable from './knownAddressesTable';

const SettingsModal: FC = () => {
  const {client, updateClient} = useClientContext();
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rpcUrlInput, setRpcUrlInput] = useState('');
  const [chainIdInput, setChainIdInput] = useState(1);

  async function handleConnect() {
    setHasError(false);
    setIsLoading(true);
    const success = await updateClient(rpcUrlInput, chainIdInput);
    setIsLoading(false);
    if (!success) {
      setHasError(true);
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={<Title>Settings</Title>} size="xl">
        <Stack>
          {hasError && <Text color="red">Could not connect to host OR the chain ID is wrong.</Text>}
          <TextInput
            label={<Title order={5}>RPC URL</Title>}
            description={'Current: ' + client.URL}
            placeholder="http://localhost:8545"
            value={rpcUrlInput}
            onChange={event => setRpcUrlInput(event.currentTarget.value)}
          />
          <NumberInput
            label={<Title order={5}>Chain ID</Title>}
            description={'Current: ' + client.chainId}
            hideControls
            placeholder="1"
            min={1}
            value={chainIdInput}
            onChange={val => val && setChainIdInput(val)}
          />
          <Button onClick={handleConnect} loading={isLoading}>
            Connect
          </Button>

          <Title order={5}>Known Addresses</Title>
          <KnownAddressesTable />
        </Stack>
      </Modal>
      <ActionIcon disabled={opened} onClick={() => setOpened(true)}>
        <IconSettings stroke={1.2} size={24} />
      </ActionIcon>
    </>
  );
};

export default SettingsModal;
