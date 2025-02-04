import { useLocalSearchParams } from 'expo-router';
import { AssociateProps } from 'interfaces/AssociateProps';
import { AttendProps } from 'interfaces/AttendProps';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { showAssociatesPerCpf } from 'services/show-associate-per-cpf';
import { showAttendPerCpf } from 'services/show-attend-per-cpf';

export default function Associate() {
  const { AssociateCpf } = useLocalSearchParams();
  const [associate, setAssociate] = useState({} as AssociateProps);
  const [attend, setAttend] = useState<AttendProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function showAssociate() {
      setLoading(true);
      const response = await showAssociatesPerCpf(AssociateCpf as string);
      setAssociate(response);
      setLoading(false);
    }
    showAssociate();
    async function showAttend() {
      const response = await showAttendPerCpf(AssociateCpf as string);
      setAttend(response);
    }
    showAttend();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
              <Text style={styles.title}>Dados do Associado</Text>
              <Text style={styles.text}>Nome completo: {associate.fullName}</Text>
              <Text style={styles.text}>CPF: {associate.cpf}</Text>
              <Text style={styles.text}>RG: {associate.rg}</Text>
              <Text style={styles.text}>Órgão emissor: {associate.issuingBody}</Text>
              {/* <Text style={styles.text}>
            Data de nascimento:{' '}
            {`${associate.dateOfBirth.slice(8, 10)}/${associate.dateOfBirth.slice(5, 7)}/${associate.dateOfBirth.slice(0, 4)}`}
          </Text> */}
              <Text style={styles.text}>Telefone celular: {associate.cellPhone}</Text>
              <Text style={styles.text}>Telefone residencial: {associate.homePhone}</Text>
              <Text style={styles.text}>E-mail: {associate.email}</Text>
              <Text style={styles.text}>Endereço: {associate.address}</Text>
              <Text style={styles.text}>Rua: {associate.street}</Text>
              <Text style={styles.text}>Estado: {associate.state}</Text>
              <Text style={styles.text}>Cidade: {associate.city}</Text>
              <Text style={styles.text}>CEP: {associate.cep}</Text>
              <Text style={styles.text}>Estado cívil: {associate.maritalStatus}</Text>
              <Text style={styles.text}>Nacionalidade: {associate.natiolity}</Text>
              <Text style={styles.text}>
                Categoria de associação: {associate.associationCategory}
              </Text>
              <Text style={styles.text}>
                Valor de contribuição: {associate.contribuitionAmount}
              </Text>
              <Text style={styles.text}>Método de pagamento: {associate.paymentMethod}</Text>
              <Text style={styles.text}>Nome do responsável: {associate.responsibleName}</Text>
              <Text style={styles.text}>CPF do responsável: {associate.responsibleCPF}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Dados do Assistido</Text>
              {!attend ? (
                <Text style={{ fontSize: 16, color: 'red' }}>
                  Nenhum assistido cadastrado nesse CPF
                </Text>
              ) : (
                <View style={{ gap: 8 }}>
                  <Text style={styles.text}>Contato de emergência: </Text>
                  <Text style={styles.textTab}>Nome completo: {attend.emergencyContact.name}</Text>
                  <Text style={styles.textTab}>Parentesco: {attend.emergencyContact.kinship}</Text>
                  <Text style={styles.textTab}>
                    Número de telefone: {attend.emergencyContact.phoneNumber}
                  </Text>
                  {!attend.dataOfResponsible ? (
                    <Text style={styles.text}>Dados do responsável: Não se aplica</Text>
                  ) : (
                    <View style={{ gap: 8 }}>
                      <Text style={styles.text}>Dados do responsável:</Text>
                      <Text style={styles.textTab}>
                        Nome completo: {attend.dataOfResponsible.fullName}
                      </Text>
                      <Text style={styles.textTab}>CPF: {attend.dataOfResponsible.cpf}</Text>
                      <Text style={styles.textTab}>RG: {attend.dataOfResponsible.rg}</Text>
                      <Text style={styles.textTab}>
                        Data de nascimento: {attend.dataOfResponsible.dateOfBirth}
                      </Text>
                      <Text style={styles.textTab}>
                        Telefone celular: {attend.dataOfResponsible.cellPhone}
                      </Text>
                      <Text style={styles.textTab}>
                        Telefone residencial: {attend.dataOfResponsible.homePhone}
                      </Text>
                      <Text style={styles.textTab}>
                        Endereço: {attend.dataOfResponsible.address}
                      </Text>
                      <Text style={styles.textTab}>E-mail: {attend.dataOfResponsible.email}</Text>
                      <Text style={styles.textTab}>
                        Parentesco: {attend.dataOfResponsible.kinship}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.text}>Escola atual: {attend.currentSchool}</Text>
                  <Text style={styles.text}>Trabalha: {attend.working}</Text>
                  <Text style={styles.text}>Função no trabalho: {attend.functionWork}</Text>
                  <Text style={styles.text}>Ano do diagnóstico: {attend.diagnosisYear}</Text>
                  <Text style={styles.text}>Convênio Médico: {attend.medicalInsurance}</Text>
                  <Text style={styles.text}>Alergias: {attend.allergies}</Text>
                  <Text style={styles.text}>Alergias: {attend.allergies}</Text>
                  <Text style={styles.text}>Quantidade de quimios: {attend.amountOfQuimi}</Text>
                  <Text style={styles.text}>Quantidade de rádios: {attend.amountOfRad}</Text>
                  <Text style={styles.text}>Fez cirurgia: {attend.hadSurgery}</Text>
                  <Text style={styles.text}>Tipo de cirurgia: {attend.typeSurgery}</Text>
                  <Text style={styles.text}>Mastologista: {attend.mastologis}</Text>
                  <Text style={styles.text}>Oncologista: {attend.oncologist}</Text>
                  <Text style={styles.text}>Vacinas: {attend.vaccines}</Text>
                  <Text style={styles.text}>Condições especiais: {attend.specialsConditions}</Text>
                  <Text style={styles.text}>Observações: {attend.observations}</Text>
                  <Text style={styles.text}>
                    Turno de participação preferido: {attend.preferredParticipationShift}
                  </Text>
                  <Text style={styles.text}>Dependentes: {attend.dependents}</Text>
                  <Text style={styles.text}>
                    Número de dependentes: {attend.numberOfDependents}
                  </Text>
                  <Text style={styles.text}>
                    Relação de dependentes: {attend.relationOfDependents}
                  </Text>
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
    gap: 8,
  },
  title: {
    fontSize: 28,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 16,
  },
  textTab: {
    fontSize: 16,
    paddingStart: 20,
  },
});
