import { Input, Select, SelectItem } from '@nextui-org/react';
import { FC } from 'react';

interface AddressFormProps {
  addressData: any;
}

const AddressForm: FC<AddressFormProps> = ({ addressData }) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        value={addressData.first_name}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        label="Last Name"
        placeholder="Enter your Last name"
        value={addressData.last_name}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        label="Company"
        placeholder="Enter your first name"
        value={addressData.company}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        label="Street Address"
        placeholder="Address Line 1"
        value={addressData.address_1}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        placeholder="Address Line 2"
        value={addressData.address_2}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="text"
        label="City"
        placeholder="City"
        value={addressData.city}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Select
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        label="Province"
        value={addressData.province}
      >
        <SelectItem key={'easterncape'} value={'Eastern Cape'}>
          Eastern Cape
        </SelectItem>
        <SelectItem key={'freestate'} value={'Free State'}>
          Free State
        </SelectItem>
        <SelectItem key={'gauteng'} value={'Gauteng'}>
          Gauteng
        </SelectItem>
        <SelectItem key={'kzn'} value={'KwaZulu-Natal'}>
          KwaZulu-Natal
        </SelectItem>
        <SelectItem key={'limpopo'} value={'Limpopo'}>
          Limpopo
        </SelectItem>
        <SelectItem key={'mpumalanga'} value={'Mpumalanga'}>
          Mpumalanga
        </SelectItem>
        <SelectItem key={'northerncape'} value={'Northern Cape'}>
          Northern Cape
        </SelectItem>
        <SelectItem key={'northwest'} value={'North West'}>
          North West
        </SelectItem>
        <SelectItem key={'westerncape'} value={'Western Cape'}>
          Western Cape
        </SelectItem>
      </Select>
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="number"
        label="Postcode"
        placeholder="Postcode"
        value={addressData.postcode}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
      <Input
        isRequired
        variant="bordered"
        className="font-Zilla"
        radius="sm"
        labelPlacement="inside"
        isClearable
        type="tel"
        label="Phone Number"
        placeholder="Phone Number"
        value={addressData.phone}
        // color={firstNameError === 'invalid' ? 'danger' : undefined}
        // errorMessage={firstNameError === 'invalid' && 'This field is required'}
        // onValueChange={setFirstName}
      />
    </div>
  );
};

export default AddressForm;
