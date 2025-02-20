interface BirthdayProps {
  address: string;
  cpf: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  homePhone: string;
  cellPhone: string;
}

export interface Birthday {
  props: BirthdayProps;
}
