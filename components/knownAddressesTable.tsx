import {Table} from '@mantine/core';
import type {FC} from 'react';
import constants from '../constants';

const KnownAddressesTable: FC = () => {
  // TODO: add addition & deletion to the table dynamically
  return (
    <Table>
      {/* <thead style={{textAlign: 'left'}}>
        <th>Label</th>
        <th>Address</th>
      </thead> */}
      <tbody>
        {Object.keys(constants.knownAddresses).map(key => (
          <tr key={key}>
            <td>
              {
                // @ts-ignore
                constants.knownAddresses[key]
              }
            </td>
            <td>{key}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default KnownAddressesTable;
