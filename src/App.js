import React, { useState } from 'react';
import { User, Building, CreditCard, LogOut } from 'lucide-react';

const AcademiaApp = () => {
  const [empresaLogada, setEmpresaLogada] = useState(null);
  const [step, setStep] = useState(1);

  const [formFuncionario, setFormFuncionario] = useState({
    nomeFuncionario: '',
    cpf: '',
    emailFuncionario: '',
    telefoneFuncionario: '',
    plano: 'basico',
    coparticipacao: '0'
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nomeEmpresa: '',
    cnpj: '',
    emailEmpresa: '',
    telefoneEmpresa: '',
    responsavel: '',
  });

  const [usuarios, setUsuarios] = useState([]);
  const [modoLogin, setModoLogin] = useState(true);

  const planos = {
    basico: { nome: 'Básico', valor: 80, descricao: 'Musculação' },
    premium: { nome: 'Premium', valor: 120, descricao: 'Básico + Aulas + Lutas' },
    completo: { nome: 'Completo', valor: 150, descricao: 'Premium + Quadra' }
  };

  const handleLoginEmpresa = () => {
    if (formEmpresa.cnpj && formEmpresa.nomeEmpresa) {
      setEmpresaLogada(formEmpresa);
      alert(`Bem-vindo, ${formEmpresa.nomeEmpresa}!`);
    } else {
      alert('Preencha os campos obrigatórios');
    }
  };

  const handleCadastroEmpresa = () => {
    if (formEmpresa.nomeEmpresa && formEmpresa.cnpj && formEmpresa.emailEmpresa) {
      setEmpresaLogada(formEmpresa);
      alert('Empresa cadastrada com sucesso!');
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  };

  const handleLogoutEmpresa = () => {
    if (window.confirm('Deseja realmente sair?')) {
      setEmpresaLogada(null);
      setFormEmpresa({
        nomeEmpresa: '',
        cnpj: '',
        emailEmpresa: '',
        telefoneEmpresa: '',
        responsavel: '',
      });
      setStep(1);
    }
  };

  const handleInputFuncionario = (field, value) => {
    setFormFuncionario(prev => ({ ...prev, [field]: value }));
  };

  const handleInputEmpresa = (field, value) => {
    setFormEmpresa(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitFuncionario = () => {
    if (!empresaLogada) {
      alert('Empresa não está logada');
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      ...formFuncionario,
      nomeEmpresa: empresaLogada.nomeEmpresa || '',
      cnpj: empresaLogada.cnpj || '',
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      status: 'ativo'
    };

    setUsuarios(prev => [...prev, novoUsuario]);
    alert('Funcionário cadastrado com sucesso!');

    setFormFuncionario({
      nomeFuncionario: '',
      cpf: '',
      emailFuncionario: '',
      telefoneFuncionario: '',
      plano: 'basico',
      coparticipacao: '0'
    });
    setStep(1);
  };

  // TELA DE LOGIN/CADASTRO
  if (!empresaLogada) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-md mx-auto pt-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-300 mb-2">Academia Pratick Pass</h1>
            <p className="text-gray-300">Sistema de Gestão</p>
          </div>

          <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setModoLogin(true)}
              className={`flex-1 py-3 rounded-md font-semibold transition-all ${modoLogin
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setModoLogin(false)}
              className={`flex-1 py-3 rounded-md font-semibold transition-all ${!modoLogin
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600'
                }`}
            >
              Cadastrar Empresa
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            {modoLogin ? (
              <div>
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 text-blue-500 mr-2" />
                  <h2 className="text-xl font-bold text-white">Login da Empresa</h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Nome da Empresa</label>
                  <input
                    type="text"
                    value={formEmpresa.nomeEmpresa}
                    onChange={(e) => handleInputEmpresa('nomeEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: Tech Solutions Ltda"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white">CNPJ</label>
                  <input
                    type="text"
                    value={formEmpresa.cnpj}
                    onChange={(e) => handleInputEmpresa('cnpj', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                <button
                  onClick={handleLoginEmpresa}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                >
                  Entrar
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 text-blue-500 mr-2" />
                  <h2 className="text-xl font-bold text-white">Cadastro da Empresa</h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Nome da Empresa *</label>
                  <input
                    type="text"
                    value={formEmpresa.nomeEmpresa}
                    onChange={(e) => handleInputEmpresa('nomeEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: Tech Solutions Ltda"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">CNPJ *</label>
                  <input
                    type="text"
                    value={formEmpresa.cnpj}
                    onChange={(e) => handleInputEmpresa('cnpj', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Email Corporativo *</label>
                  <input
                    type="email"
                    value={formEmpresa.emailEmpresa}
                    onChange={(e) => handleInputEmpresa('emailEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="contato@empresa.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Telefone</label>
                  <input
                    type="text"
                    value={formEmpresa.telefoneEmpresa}
                    onChange={(e) => handleInputEmpresa('telefoneEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white">Responsável RH</label>
                  <input
                    type="text"
                    value={formEmpresa.responsavel}
                    onChange={(e) => handleInputEmpresa('responsavel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Nome do responsável"
                  />
                </div>

                <button
                  onClick={handleCadastroEmpresa}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                >
                  Cadastrar Empresa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // TELA LOGADA - CADASTRO DE FUNCIONÁRIOS
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">{empresaLogada?.nomeEmpresa}</h1>
            <p className="text-sm text-gray-300">CNPJ: {empresaLogada?.cnpj}</p>
          </div>
          <button
            onClick={handleLogoutEmpresa}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-8">Cadastrar Funcionário</h2>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              2
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-white">Dados do Funcionário</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Nome Completo</label>
                  <input
                    type="text"
                    value={formFuncionario.nomeFuncionario}
                    onChange={(e) => handleInputFuncionario('nomeFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Nome do funcionário"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">CPF</label>
                  <input
                    type="text"
                    value={formFuncionario.cpf}
                    onChange={(e) => handleInputFuncionario('cpf', e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email</label>
                  <input
                    type="email"
                    value={formFuncionario.emailFuncionario}
                    onChange={(e) => handleInputFuncionario('emailFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="funcionario@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Telefone</label>
                  <input
                    type="text"
                    value={formFuncionario.telefoneFuncionario}
                    onChange={(e) => handleInputFuncionario('telefoneFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formFuncionario.nomeFuncionario || !formFuncionario.cpf}
                className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Próximo
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-white">Plano e Pagamento</h3>
              </div>

              <h4 className="font-semibold mb-4 text-white">Escolha o Plano:</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(planos).map(([key, plano]) => (
                  <div
                    key={key}
                    onClick={() => handleInputFuncionario('plano', key)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formFuncionario.plano === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <h3 className="font-bold text-lg">{plano.nome}</h3>
                    <p className="text-green-600 font-bold text-xl">R$ {plano.valor}/mês</p>
                    <p className="text-sm text-gray-600 mt-2">{plano.descricao}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold mb-4 text-white">Coparticipação:</h4>
              <div className="space-y-2 mb-6">
                {[
                  { value: '0', label: 'Empresa paga 100%' },
                  { value: '20', label: 'Funcionário paga 20%' },
                  { value: '50', label: 'Funcionário paga 50%' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputFuncionario('coparticipacao', option.value)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${formFuncionario.coparticipacao === option.value
                      ? 'border-blue-500 bg-blue-50 font-semibold'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-700">
                <h4 className="font-bold mb-2 text-white">Resumo:</h4>
                <p className="text-gray-200"><strong>Plano:</strong> {planos[formFuncionario.plano].nome}</p>
                <p className="text-gray-200"><strong>Valor total:</strong> R$ {planos[formFuncionario.plano].valor}/mês</p>
                <p className="text-gray-200"><strong>Empresa paga:</strong> R$ {Math.round(planos[formFuncionario.plano].valor * (100 - parseInt(formFuncionario.coparticipacao)) / 100)}/mês</p>
                {parseInt(formFuncionario.coparticipacao) > 0 && (
                  <p className="text-gray-200"><strong>Funcionário paga:</strong> R$ {Math.round(planos[formFuncionario.plano].valor * parseInt(formFuncionario.coparticipacao) / 100)}/mês</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 font-semibold transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSubmitFuncionario}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold transition-colors"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Funcionários */}
        {usuarios.length > 0 && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Funcionários Cadastrados ({usuarios.length})</h3>
            <div className="space-y-3">
              {usuarios.map(usuario => (
                <div key={usuario.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-bold text-lg">{usuario.nomeFuncionario}</p>
                  <p className="text-sm text-gray-600">CPF: {usuario.cpf}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                      {planos[usuario.plano].nome}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                      Ativo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademiaApp;