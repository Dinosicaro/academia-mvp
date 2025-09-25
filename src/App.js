import React, { useState } from 'react';
import { User, Building, CreditCard, Check } from 'lucide-react';

const AcademiaMVP = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeEmpresa: '', cnpj: '', emailEmpresa: '', telefoneEmpresa: '', responsavel: '',
    nomeFuncionario: '', cpf: '', emailFuncionario: '', telefoneFuncionario: '',
    plano: 'basico', coparticipacao: '0'
  });
  const [usuarios, setUsuarios] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field, value) => {
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
    setSuccess(true);

    setTimeout(() => {
      setFormData({
        nomeEmpresa: '', cnpj: '', emailEmpresa: '', telefoneEmpresa: '', responsavel: '',
        nomeFuncionario: '', cpf: '', emailFuncionario: '', telefoneFuncionario: '',
        plano: 'basico', coparticipacao: '0'
      });
      setStep(1);
      setSuccess(false);
    }, 2000);
  };

  const planos = {
    basico: { nome: 'Básico', valor: 80, descricao: 'Musculação + Vestiário' },
    premium: { nome: 'Premium', valor: 120, descricao: 'Básico + Aulas + Lutas' },
    completo: { nome: 'Completo', valor: 150, descricao: 'Premium + Quadra + Extras' }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-600">O funcionário foi cadastrado com sucesso na plataforma.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Academia Corporate</h1>
          <p className="text-gray-600">Sistema de cadastro para empresas parceiras</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>1</div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>2</div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>3</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Dados da Empresa */}
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <Building className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold">Dados da Empresa</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Tech Solutions Ltda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CNPJ</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Corporativo</label>
                  <input
                    type="email"
                    value={formData.emailEmpresa}
                    onChange={(e) => handleInputChange('emailEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="contato@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="text"
                    value={formData.telefoneEmpresa}
                    onChange={(e) => handleInputChange('telefoneEmpresa', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Responsável RH</label>
                  <input
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.nomeEmpresa || !formData.cnpj}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          )}

          {/* Step 2: Dados do Funcionário */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold">Dados do Funcionário</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nomeFuncionario}
                    onChange={(e) => handleInputChange('nomeFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome do funcionário"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CPF</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.emailFuncionario}
                    onChange={(e) => handleInputChange('emailFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="funcionario@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="text"
                    value={formData.telefoneFuncionario}
                    onChange={(e) => handleInputChange('telefoneFuncionario', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.nomeFuncionario || !formData.cpf}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Plano e Pagamento */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold">Plano e Pagamento</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(planos).map(([key, plano]) => (
                  <div
                    key={key}
                    onClick={() => handleInputChange('plano', key)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.plano === key
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

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Coparticipação do Funcionário</label>
                <select
                  value={formData.coparticipacao}
                  onChange={(e) => handleInputChange('coparticipacao', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Empresa paga 100%</option>
                  <option value="20">Funcionário paga 20%</option>
                  <option value="50">Funcionário paga 50%</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-2">Resumo:</h3>
                <p><strong>Plano:</strong> {planos[formData.plano].nome}</p>
                <p><strong>Valor total:</strong> R$ {planos[formData.plano].valor}/mês</p>
                <p><strong>Empresa paga:</strong> R$ {Math.round(planos[formData.plano].valor * (100 - formData.coparticipacao) / 100)}/mês</p>
                {formData.coparticipacao > 0 && (
                  <p><strong>Funcionário paga:</strong> R$ {Math.round(planos[formData.plano].valor * formData.coparticipacao / 100)}/mês</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                  Finalizar Cadastro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Usuários Cadastrados */}
        {usuarios.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Usuários Cadastrados ({usuarios.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Funcionário</th>
                    <th className="p-2 text-left">Empresa</th>
                    <th className="p-2 text-left">Plano</th>
                    <th className="p-2 text-left">Data</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(usuario => (
                    <tr key={usuario.id} className="border-b">
                      <td className="p-2">{usuario.nomeFuncionario}</td>
                      <td className="p-2">{usuario.nomeEmpresa}</td>
                      <td className="p-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {planos[usuario.plano].nome}
                        </span>
                      </td>
                      <td className="p-2">{usuario.dataRegistro}</td>
                      <td className="p-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {usuario.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademiaMVP;