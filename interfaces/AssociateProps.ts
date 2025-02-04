export interface AssociateProps {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  natiolity: string;
  maritalStatus: string;
  cpf: string;
  rg: string;
  issuingBody: string;
  address: string;
  street: string;
  city: string;
  cep: string;
  state: string;
  homePhone: string;
  cellPhone: string;
  email: string;
  associationCategory: string;
  contribuitionAmount: string;
  paymentMethod: string;
  responsibleCPF: string;
  responsibleName: string;
  monthBirthday: string;
  dayBirthday: number;
}

export interface Associate {
  props: AssociateProps;
}
