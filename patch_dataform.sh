#!/bin/bash

# Customer Info
sed -i -e "s/{renderField('Full Name', 'name', 'text', '', 0)}/{renderField('Name', 'name', 'text', '', 0)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Consumer Number', 'consumerNumber', 'text', '', 1)}/{renderField('Consumer number', 'consumerNumber', 'text', '', 1)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Address', 'address', 'text', '', 2)}/{renderField('Site\\/Location With Complete Address', 'address', 'text', '', 2)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Mobile Number', 'mobileNumber', 'text', '', 4)}/{renderField('Mobile number', 'mobileNumber', 'text', '', 4)}/" src/components/DataForm.tsx

# KYC
sed -i -e "s/{renderField('Aadhaar Number', 'aadhaarNumber', 'text', '', 0)}/{renderField('Aadhar Number', 'aadhaarNumber', 'text', '', 0)}/" src/components/DataForm.tsx

# Capacities
sed -i -e "s/{renderField('Sanctioned Capacity (kW)', 'sanctionedCapacity', 'number', '', 0)}/{renderField('Sanctioned Capacity of solar PV system (KW)', 'sanctionedCapacity', 'number', '', 0)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Installed Capacity (kW)', 'installedCapacity', 'number', '', 1)}/{renderField('Capacity of solar PV system (KW)', 'installedCapacity', 'number', '', 1)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Installation Date', 'installationDate', 'date', '', 2)}/{renderField('Installation Date', 'installationDate', 'date', '', 2)}/" src/components/DataForm.tsx

# Equipment
sed -i -e "s/{renderField('Module Make', 'moduleMake', 'text', '', 0)}/{renderField('Make of Module', 'moduleMake', 'text', '', 0)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Module Model', 'moduleModel', 'text', '', 1)}/{renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Module Wattage per (Wp)', 'moduleWattage', 'number', '', 2)}/{renderField('Wattage per module', 'moduleWattage', 'number', '', 2)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('No. of Modules', 'numberOfModules', 'number', '', 3)}/{renderField('No. of Module', 'numberOfModules', 'number', '', 3)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Inverter Make', 'inverterMake', 'text', '', 4)}/{renderField('Make of Inverter', 'inverterMake', 'text', '', 4)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Inverter Model', 'inverterModel', 'text', '', 5)}/{renderField('Model Number of Inverter', 'inverterModel', 'text', '', 5)}/" src/components/DataForm.tsx
sed -i -e "s/{renderField('Inverter Capacity (kW)', 'inverterCapacity', 'number', '', 6)}/{renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 6)}/" src/components/DataForm.tsx

