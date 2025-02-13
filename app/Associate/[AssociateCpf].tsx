import { TextI } from 'components/TextI';
import { useLocalSearchParams } from 'expo-router';
import { AssociateProps } from 'interfaces/AssociateProps';
import { AttendProps } from 'interfaces/AttendProps';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { showAssociatesPerCpf } from 'services/show-associate-per-cpf';
import { showAttendPerCpf } from 'services/show-attend-per-cpf';

export default function Associate() {
  const { AssociateCpf } = useLocalSearchParams();
  const [associate, setAssociate] = useState({} as AssociateProps);
  const [attend, setAttend] = useState<AttendProps | null>(null);
  const [loading, setLoading] = useState(false);

  async function showAssociate() {
    setLoading(true);
    const response = await showAssociatesPerCpf(AssociateCpf as string);
    setAssociate(response);
    setLoading(false);
  }
  async function showAttend() {
    const response = await showAttendPerCpf(AssociateCpf as string);
    setAttend(response);
  }
  useEffect(() => {
    showAssociate();

    showAttend();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <ActivityIndicator
              size={128}
              color="#c50b31"
              style={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        ) : (
          <View>
            <View style={styles.section}>
              <TextI style={styles.title}>Dados do Associado</TextI>
              <TextI style={styles.text}>
                Nome completo: <TextI style={{ fontWeight: 'bold' }}>{associate.fullName}</TextI>
              </TextI>
              <TextI style={styles.text}>
                CPF: <TextI style={{ fontWeight: 'bold' }}>{associate.cpf}</TextI>
              </TextI>
              <TextI style={styles.text}>
                RG: <TextI style={{ fontWeight: 'bold' }}>{associate.rg}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Órgão emissor: <TextI style={{ fontWeight: 'bold' }}>{associate.issuingBody}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Data de nascimento:{' '}
                <TextI style={{ fontWeight: 'bold' }}>
                  {associate.dateOfBirth &&
                    `${associate.dateOfBirth.slice(8, 10)}/${associate.dateOfBirth.slice(5, 7)}/${associate.dateOfBirth.slice(0, 4)}`}
                </TextI>
              </TextI>
              <TextI style={styles.text}>
                Telefone celular:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.cellPhone}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Telefone residencial:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.homePhone}</TextI>
              </TextI>
              <TextI style={styles.text}>
                E-mail: <TextI style={{ fontWeight: 'bold' }}>{associate.email}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Endereço: <TextI style={{ fontWeight: 'bold' }}>{associate.address}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Rua: <TextI style={{ fontWeight: 'bold' }}>{associate.street}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Estado: <TextI style={{ fontWeight: 'bold' }}>{associate.state}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Cidade: <TextI style={{ fontWeight: 'bold' }}>{associate.city}</TextI>
              </TextI>
              <TextI style={styles.text}>
                CEP: <TextI style={{ fontWeight: 'bold' }}>{associate.cep}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Estado civil:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.maritalStatus}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Nacionalidade: <TextI style={{ fontWeight: 'bold' }}>{associate.natiolity}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Categoria de associação:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.associationCategory}</TextI>
              </TextI>

              <TextI style={styles.text}>
                Valor de contribuição:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.contribuitionAmount}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Método de pagamento:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.paymentMethod}</TextI>
              </TextI>
              <TextI style={styles.text}>
                Nome do responsável:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.responsibleName}</TextI>
              </TextI>
              <TextI style={styles.text}>
                CPF do responsável:{' '}
                <TextI style={{ fontWeight: 'bold' }}>{associate.responsibleCPF}</TextI>
              </TextI>
            </View>

            <View style={styles.section}>
              <TextI style={styles.title}>Dados do Assistido</TextI>
              {!attend ? (
                <TextI style={{ fontSize: 16, color: 'red', marginBottom: 20 }}>
                  Nenhum assistido cadastrado nesse CPF
                </TextI>
              ) : (
                <View style={styles.section}>
                  <TextI style={styles.text}>Contato de emergência: </TextI>
                  <TextI style={styles.textTab}>
                    Nome completo:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.emergencyContact.name}</TextI>
                  </TextI>
                  <TextI style={styles.textTab}>
                    Parentesco:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.emergencyContact.kinship}</TextI>
                  </TextI>
                  <TextI style={styles.textTab}>
                    Número de telefone:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>
                      {attend.emergencyContact.phoneNumber}
                    </TextI>
                  </TextI>
                  {!attend.dataOfResponsible ? (
                    <TextI style={styles.text}>
                      Dados do responsável:{' '}
                      <TextI style={{ fontWeight: 'bold' }}>Não se aplica</TextI>
                    </TextI>
                  ) : (
                    <View style={{ gap: 15 }}>
                      <TextI style={styles.text}>Dados do responsável:</TextI>
                      <TextI style={styles.textTab}>
                        Nome completo:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.fullName}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        CPF:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>{attend.dataOfResponsible.cpf}</TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        RG:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>{attend.dataOfResponsible.rg}</TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        Data de nascimento:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.dateOfBirth &&
                            `${attend.dataOfResponsible.dateOfBirth.slice(8, 10)}/${attend.dataOfResponsible.dateOfBirth.slice(5, 7)}/${attend.dataOfResponsible.dateOfBirth.slice(0, 4)}`}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        Telefone celular:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.cellPhone}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        Telefone residencial:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.homePhone}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        Endereço:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.address}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        E-mail:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.email}
                        </TextI>
                      </TextI>
                      <TextI style={styles.textTab}>
                        Parentesco:{' '}
                        <TextI style={{ fontWeight: 'bold' }}>
                          {attend.dataOfResponsible.kinship}
                        </TextI>
                      </TextI>
                    </View>
                  )}
                  <TextI style={styles.text}>
                    Idade na data do contrato:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.ageSigned}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Escola atual:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.currentSchool}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Trabalha: <TextI style={{ fontWeight: 'bold' }}>{attend.working}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Função no trabalho:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.functionWork}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Ano do diagnóstico:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.diagnosisYear}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Convênio Médico:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.medicalInsurance}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Alergias: <TextI style={{ fontWeight: 'bold' }}>{attend.allergies}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Quantidade de quimios:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.amountOfQuimi}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Quantidade de rádios:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.amountOfRad}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Fez cirurgia: <TextI style={{ fontWeight: 'bold' }}>{attend.hadSurgery}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Tipo de cirurgia:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.typeSurgery}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Mastologista: <TextI style={{ fontWeight: 'bold' }}>{attend.mastologis}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Oncologista: <TextI style={{ fontWeight: 'bold' }}>{attend.oncologist}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Vacinas: <TextI style={{ fontWeight: 'bold' }}>{attend.vaccines}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Condições especiais:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.specialsConditions}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Medicamentos de uso contínuo:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.continuousUseMedications}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Observações: <TextI style={{ fontWeight: 'bold' }}>{attend.observations}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Turno de participação preferido:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>
                      {attend.preferredParticipationShift}
                    </TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Atividade de interesses:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.activityOfInterest}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Dependentes: <TextI style={{ fontWeight: 'bold' }}>{attend.dependents}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Número de dependentes:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.numberOfDependents}</TextI>
                  </TextI>
                  <TextI style={styles.text}>
                    Relação de dependentes:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.relationOfDependents}</TextI>
                  </TextI>
                  <TextI style={{ ...styles.text }}>
                    Autoriza o uso da imagem:{' '}
                    <TextI style={{ fontWeight: 'bold' }}>{attend.authorizationUseImage}</TextI>
                  </TextI>
                </View>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
    gap: 18,
  },
  title: {
    fontSize: 28,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 18,
  },
  textTab: {
    fontSize: 16,
    paddingStart: 20,
  },
});
