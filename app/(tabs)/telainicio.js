
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  StatusBar,
  Image,
} from 'react-native';

const App = () => {
  const [screen, setScreen] = useState('login'); // login | signup | empresa
  const [form, setForm] = useState({
    email: '',
    senha: '',
    nome: '',
    nomeEmpresa: '',
    cnpj: '',
  });

  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255, 230, 0)', 'rgb(240, 180, 1)'], // amarelo claro → escuro
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const renderLogin = () => (
    <View>
      <Text style={styles.frase1}>
        * Entre com o email cadastrado pela sua empresa
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={form.senha}
        onChangeText={text => handleChange('senha', text)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('signup')}>
        <Text style={styles.linkText}>Login Empresa</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('empresa')}>
        <Text style={styles.linkText}>Cadastrar Empresa</Text>
      </TouchableOpacity>
    </View>
  );

  const renderloginEmpresa = () => (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={form.senha}
        onChangeText={text => handleChange('senha', text)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('login')}>
        <Text style={styles.linkText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCadastroEmpresa = () => (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nome da empresa"
        placeholderTextColor="#aaa"
        value={form.nomeEmpresa}
        onChangeText={text => handleChange('nomeEmpresa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={form.cnpj}
        onChangeText={text => handleChange('cnpj', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={form.senha}
        onChangeText={text => handleChange('senha', text)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Empresa</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('login')}>
        <Text style={styles.linkText}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Título fixo no topo */}
      <View style={styles.header}>
        <Animated.Text style={[styles.title, { color: animatedColor }]}>
          Patrick Pass
        </Animated.Text>


      </View>

      {/* Conteúdo centralizado */}
      <View style={styles.content}>
        {screen === 'login' && renderLogin()}
        {screen === 'signup' && renderloginEmpresa()}
        {screen === 'empresa' && renderCadastroEmpresa()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70, // formato circular
    marginTop: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frase1: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgb(255, 213, 0)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default App;


