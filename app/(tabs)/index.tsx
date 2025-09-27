import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';

const AcademiaApp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    emailEmpresa: '',
    telefoneEmpresa: '',
    responsavel: '',
    nomeFuncionario: '',
    cpf: '',
    emailFuncionario: '',
    telefoneFuncionario: '',
    plano: 'basico',
    coparticipacao: '0'
  });
  const [usuarios, setUsuarios] = useState([]);

  const planos = {
    basico: { nome: 'Básico', valor: 80, descricao: 'Musculação + Vestiário' },
    premium: { nome: 'Premium', valor: 120, descricao: 'Básico + Aulas + Lutas' },
    completo: { nome: 'Completo', valor: 150, descricao: 'Premium + Quadra + Extras' }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const novoUsuario = {
      id: Date.now(),
      ...formData,
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      status: 'ativo'
    };

    setUsuarios(prev => [...prev, novoUsuario]);
    Alert.alert('Sucesso!', 'Funcionário cadastrado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          setFormData({
            nomeEmpresa: '', cnpj: '', emailEmpresa: '', telefoneEmpresa: '', responsavel: '',
            nomeFuncionario: '', cpf: '', emailFuncionario: '', telefoneFuncionario: '',
            plano: 'basico', coparticipacao: '0'
          });
          setStep(1);
        }
      }
    ]);
  };

  const StepIndicator = () => (
    <View style={styles.stepContainer}>
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <View style={[
            styles.stepCircle,
            { backgroundColor: step >= stepNumber ? '#007AFF' : '#E5E5E5' }
          ]}>
            <Text style={[
              styles.stepNumber,
              { color: step >= stepNumber ? 'white' : '#999' }
            ]}>
              {stepNumber}
            </Text>
          </View>
          {stepNumber < 3 && (
            <View style={[
              styles.stepLine,
              { backgroundColor: step > stepNumber ? '#007AFF' : '#E5E5E5' }
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>📋 Dados da Empresa</Text>

      <Text style={styles.label}>Nome da Empresa</Text>
      <TextInput
        style={styles.input}
        value={formData.nomeEmpresa}
        onChangeText={(text) => handleInputChange('nomeEmpresa', text)}
        placeholder="Ex: Tech Solutions Ltda"
      />

      <Text style={styles.label}>CNPJ</Text>
      <TextInput
        style={styles.input}
        value={formData.cnpj}
        onChangeText={(text) => handleInputChange('cnpj', text)}
        placeholder="00.000.000/0001-00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Email Corporativo</Text>
      <TextInput
        style={styles.input}
        value={formData.emailEmpresa}
        onChangeText={(text) => handleInputChange('emailEmpresa', text)}
        placeholder="contato@empresa.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={formData.telefoneEmpresa}
        onChangeText={(text) => handleInputChange('telefoneEmpresa', text)}
        placeholder="(11) 99999-9999"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Responsável RH</Text>
      <TextInput
        style={styles.input}
        value={formData.responsavel}
        onChangeText={(text) => handleInputChange('responsavel', text)}
        placeholder="Nome do responsável"
      />

      <TouchableOpacity
        style={[styles.button, !formData.nomeEmpresa || !formData.cnpj ? styles.buttonDisabled : null]}
        onPress={() => setStep(2)}
        disabled={!formData.nomeEmpresa || !formData.cnpj}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>👤 Dados do Funcionário</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={formData.nomeFuncionario}
        onChangeText={(text) => handleInputChange('nomeFuncionario', text)}
        placeholder="Nome do funcionário"
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={formData.cpf}
        onChangeText={(text) => handleInputChange('cpf', text)}
        placeholder="000.000.000-00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.emailFuncionario}
        onChangeText={(text) => handleInputChange('emailFuncionario', text)}
        placeholder="funcionario@empresa.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={formData.telefoneFuncionario}
        onChangeText={(text) => handleInputChange('telefoneFuncionario', text)}
        placeholder="(11) 99999-9999"
        keyboardType="phone-pad"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => setStep(1)}>
          <Text style={styles.buttonSecondaryText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !formData.nomeFuncionario || !formData.cpf ? styles.buttonDisabled : null]}
          onPress={() => setStep(3)}
          disabled={!formData.nomeFuncionario || !formData.cpf}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>💳 Plano e Pagamento</Text>

      <Text style={styles.sectionTitle}>Escolha o Plano:</Text>
      {Object.entries(planos).map(([key, plano]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.planoCard,
            formData.plano === key ? styles.planoSelected : null
          ]}
          onPress={() => handleInputChange('plano', key)}
        >
          <Text style={styles.planoNome}>{plano.nome}</Text>
          <Text style={styles.planoValor}>R$ {plano.valor}/mês</Text>
          <Text style={styles.planoDescricao}>{plano.descricao}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Coparticipação:</Text>
      <View style={styles.coparticipacaoContainer}>
        {[
          { value: '0', label: 'Empresa paga 100%' },
          { value: '20', label: 'Funcionário paga 20%' },
          { value: '50', label: 'Funcionário paga 50%' }
        ].map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.coparticipacaoOption,
              formData.coparticipacao === option.value ? styles.coparticipacaoSelected : null
            ]}
            onPress={() => handleInputChange('coparticipacao', option.value)}
          >
            <Text style={[
              styles.coparticipacaoText,
              formData.coparticipacao === option.value ? styles.coparticipacaoTextSelected : null
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resumoContainer}>
        <Text style={styles.resumoTitle}>Resumo:</Text>
        <Text style={styles.resumoText}>Plano: {planos[formData.plano].nome}</Text>
        <Text style={styles.resumoText}>Valor total: R$ {planos[formData.plano].valor}/mês</Text>
        <Text style={styles.resumoText}>
          Empresa paga: R$ {Math.round(planos[formData.plano].valor * (100 - parseInt(formData.coparticipacao)) / 100)}/mês
        </Text>
        {parseInt(formData.coparticipacao) > 0 && (
          <Text style={styles.resumoText}>
            Funcionário paga: R$ {Math.round(planos[formData.plano].valor * parseInt(formData.coparticipacao) / 100)}/mês
          </Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => setStep(2)}>
          <Text style={styles.buttonSecondaryText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Academia Corporate</Text>
        <Text style={styles.subtitle}>Sistema Mobile</Text>

        <StepIndicator />

        <View style={styles.formContainer}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </View>

        {usuarios.length > 0 && (
          <View style={styles.usuariosContainer}>
            <Text style={styles.usuariosTitle}>Usuários Cadastrados ({usuarios.length})</Text>
            {usuarios.map(usuario => (
              <View key={usuario.id} style={styles.usuarioCard}>
                <Text style={styles.usuarioNome}>{usuario.nomeFuncionario}</Text>
                <Text style={styles.usuarioEmpresa}>{usuario.nomeEmpresa}</Text>
                <View style={styles.usuarioInfo}>
                  <Text style={styles.usuarioPlano}>{planos[usuario.plano].nome}</Text>
                  <Text style={styles.usuarioStatus}>Ativo</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 5,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonSecondary: {
    backgroundColor: '#6C757D',
    marginRight: 10,
  },
  buttonSuccess: {
    backgroundColor: '#28A745',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  planoCard: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  planoSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  planoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planoValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 4,
  },
  planoDescricao: {
    fontSize: 14,
    color: '#666',
  },
  coparticipacaoContainer: {
    marginBottom: 20,
  },
  coparticipacaoOption: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
  },
  coparticipacaoSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  coparticipacaoText: {
    fontSize: 16,
    color: '#333',
  },
  coparticipacaoTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  resumoContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  resumoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resumoText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  usuariosContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  usuariosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  usuarioCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  usuarioNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  usuarioEmpresa: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  usuarioInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usuarioPlano: {
    fontSize: 12,
    backgroundColor: '#007AFF',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  usuarioStatus: {
    fontSize: 12,
    backgroundColor: '#28A745',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default AcademiaApp;