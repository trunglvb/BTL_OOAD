import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample([
    'Ms Hoa',
    'Mr Thuận',
    'Mr Hoàng',
    'Ms Linh',
    'Alan',
    'Alex Nguyen',
    'Alex Nguyen1',
    'Alex Nguyen2',
    'Alex Nguyen3',
    'Alex Nguyen4',
    'Henry Vu',
    'Robert Hoang',
    'Pato Yu',
    'Eddie Liu',
    'Mark Le',
  ]),
  company: sample([
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
  ]),
  isVerified: sample([
    '0984798360',
    '0984798361',
    '0984798362',
    '0984798363',
    '0984798364',
    '0984798365',
    '0984798366',
  ]),
  status: sample(['active', 'off']),
  role: sample(['Nam', 'Nữ']),
}));

export default users;
