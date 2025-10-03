import React, { useState } from 'react';
import './styles/gradient.css';
import { Building, LogOut } from 'lucide-react';

const AcademiaApp = () => {

  const [empresaLogada, setEmpresaLogada] = useState(null);
  // const [step, setStep] = useState(1); // Removido, não usado

  const [formFuncionario, setFormFuncionario] = useState({
    nomeFuncionario: '',
    cpf: '',
    contato: '',
    email: '',
    escolhaPlano: 'empresa' // 'empresa' ou 'colaborador'
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nomeEmpresa: '',
    cnpj: '',
    emailEmpresa: '',
    telefoneEmpresa: '',
    responsavel: '',
    senha: '',
  });
  const [loginData, setLoginData] = useState({
    cnpj: '',
    senha: ''
  });
  const [empresasCadastradas, setEmpresasCadastradas] = useState([]);

  const [usuarios] = useState([]);
  const [modoLogin, setModoLogin] = useState(true);
  const [aba, setAba] = useState('login');
  const [abaPainel, setAbaPainel] = useState('dashboard');

  // const planos = { ... } // Removido, não usado

  const handleLoginEmpresa = () => {
    if (!loginData.cnpj || !loginData.senha) {
      alert('Preencha CNPJ e senha');
      return;
    }
    // Login especial de administrador
    if (loginData.cnpj === '@dmin' && loginData.senha === '@dmin2025') {
      setEmpresaLogada({ nomeEmpresa: 'Administrador', cnpj: '@dmin', responsavel: 'Administrador' });
      alert('Bem-vindo, Administrador!');
      return;
    }
    const empresa = empresasCadastradas.find(e =>
      e.cnpj.replace(/\D/g, '') === loginData.cnpj.replace(/\D/g, '')
    );
    if (!empresa) {
      alert('Empresa não cadastrada. Faça o cadastro primeiro.');
      return;
    }
    if (empresa.senha !== loginData.senha) {
      alert('Senha incorreta.');
      return;
    }
    setEmpresaLogada(empresa);
    alert(`Bem-vindo, ${empresa.nomeEmpresa}!`);
  };

  async function validarCNPJExistente(cnpj) {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, '')}`);
      if (!response.ok) return false;
      const data = await response.json();
      return !!data.cnpj;
    } catch {
      return false;
    }
  }

  const handleCadastroEmpresa = async () => {
    if (!(formEmpresa.nomeEmpresa && formEmpresa.cnpj && formEmpresa.emailEmpresa && formEmpresa.senha)) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const existe = await validarCNPJExistente(formEmpresa.cnpj);
    if (!existe) {
      alert('CNPJ não encontrado na base da Receita Federal. Verifique o número informado.');
      return;
    }
    setEmpresasCadastradas(prev => [...prev, { ...formEmpresa }]);
    setEmpresaLogada(formEmpresa);
    alert('Empresa cadastrada com sucesso!');
  };

  // const handleLogoutEmpresa = () => { ... } // Removido, não usado

  // const handleInputFuncionario = (field, value) => { ... } // Removido, não usado

  const handleInputEmpresa = (field, value) => {
    setFormEmpresa(prev => ({ ...prev, [field]: value }));
  };

  // const handleSubmitFuncionario = () => { ... } // Removido, não usado



  // TELA DE LOGIN/CADASTRO
  if (!empresaLogada) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-md mx-auto pt-12">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2 gradient-title"
            >
              Academia Pratick Pass
            </h1>
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
                  <label className="block text-sm font-medium mb-2 text-white">CNPJ</label>
                  <input
                    type="text"
                    value={loginData.cnpj}
                    onChange={e => setLoginData(prev => ({ ...prev, cnpj: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white">Senha</label>
                  <input
                    type="password"
                    value={loginData.senha}
                    onChange={e => setLoginData(prev => ({ ...prev, senha: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Digite sua senha"
                  />
                </div>

                <button
                  onClick={() => {
                    const prevEmpresa = empresaLogada;
                    handleLoginEmpresa();
                    setTimeout(() => {
                      // Só redireciona se o login realmente logou
                      if (empresaLogada !== prevEmpresa || (loginData.cnpj === '@dmin' && loginData.senha === '@dmin2025')) {
                        setAba('painel');
                      }
                    }, 100);
                  }}
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
                  <label className="block text-sm font-medium mb-2 text-white">Responsável</label>
                  <input
                    type="text"
                    value={formEmpresa.responsavel}
                    onChange={(e) => handleInputEmpresa('responsavel', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Nome do responsável"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-white">Senha *</label>
                  <input
                    type="password"
                    value={formEmpresa.senha}
                    onChange={e => handleInputEmpresa('senha', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Crie uma senha"
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

  // TELA PAINEL DE ADMIN/EMPRESA
  if (aba === 'painel' && empresaLogada) {
    // Filtrar funcionários da empresa logada
    const funcionariosEmpresa = empresaLogada.cnpj === '@dmin'
      ? usuarios // admin vê todos
      : usuarios.filter(u => u.cnpj === empresaLogada.cnpj);
    const totalCadastrados = funcionariosEmpresa.length;
    const totalAtivos = funcionariosEmpresa.filter(u => u.status === 'ativo').length;
    // Simular check-ins e gasto mensal
    const checkinsMes = funcionariosEmpresa.length > 0 ? funcionariosEmpresa.length * 3 : 0;
    const gastoMensal = funcionariosEmpresa.reduce((acc, u) => acc + (u.plano === 'completo' ? 150 : u.plano === 'premium' ? 120 : 80), 0);
    const planosAtivos = new Set(funcionariosEmpresa.map(u => u.plano)).size;

    return (
      <div className="min-h-screen bg-gray-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-6 flex flex-col gap-6">
          <h2 className="text-white text-xl font-bold mb-4">Acessos Rápidos</h2>
          <nav className="flex flex-col gap-3">
            <button
              className={`text-left text-white ${abaPainel === 'dashboard' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-600 rounded-lg px-4 py-2 font-semibold transition-colors`}
              onClick={() => setAbaPainel('dashboard')}
            >Dashboard</button>
            <button
              className={`text-left text-white ${abaPainel === 'funcionarios' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-600 rounded-lg px-4 py-2 font-semibold transition-colors`}
              onClick={() => setAbaPainel('funcionarios')}
            >Funcionários</button>
            <button
              className={`text-left text-white ${abaPainel === 'cadastrar-funcionario' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-600 rounded-lg px-4 py-2 font-semibold transition-colors`}
              onClick={() => setAbaPainel('cadastrar-funcionario')}
            >Cadastrar Funcionário</button>
            <button className="text-left text-white bg-gray-700 hover:bg-blue-600 rounded-lg px-4 py-2 font-semibold transition-colors">Editar Acesso</button>
          </nav>
          <button
            onClick={() => { setEmpresaLogada(null); setAba('login'); }}
            className="mt-auto flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </aside>
        {/* Conteúdo principal */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">👋 Olá, {empresaLogada?.responsavel || empresaLogada?.nomeEmpresa}!</h2>
            <p className="text-gray-300 text-lg">Aqui está o resumo do seu painel de gerenciamento.</p>
          </div>
          {abaPainel === 'dashboard' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <span className="text-4xl mb-2">👥</span>
                <div className="text-2xl font-bold text-white">{totalCadastrados}</div>
                <div className="text-gray-400">Funcionários cadastrados</div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <span className="text-4xl mb-2">✅</span>
                <div className="text-2xl font-bold text-white">{totalAtivos}</div>
                <div className="text-gray-400">Funcionários ativos</div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <span className="text-4xl mb-2">🏋️</span>
                <div className="text-2xl font-bold text-white">{checkinsMes}</div>
                <div className="text-gray-400">Check-ins este mês</div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <span className="text-4xl mb-2">💳</span>
                <div className="text-2xl font-bold text-white">R$ {gastoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div className="text-gray-400">Gasto mensal com planos</div>
              </div>
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <span className="text-4xl mb-2">📦</span>
                <div className="text-2xl font-bold text-white">{planosAtivos} tipos ativos</div>
                <div className="text-gray-400">Planos disponíveis</div>
              </div>
            </div>
          )}
          {abaPainel === 'funcionarios' && (
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Funcionários cadastrados</h3>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-300">Nome</th>
                    <th className="px-4 py-2 text-left text-gray-300">CPF</th>
                    <th className="px-4 py-2 text-left text-gray-300">Plano</th>
                    <th className="px-4 py-2 text-left text-gray-300">Data de Assinatura</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionariosEmpresa.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-400 py-4">Nenhum funcionário cadastrado.</td>
                    </tr>
                  ) : (
                    funcionariosEmpresa.map((f, idx) => (
                      <tr key={idx} className="hover:bg-gray-700">
                        <td className="px-4 py-2 text-white">{f.nomeFuncionario}</td>
                        <td className="px-4 py-2 text-white">{f.cpf}</td>
                        <td className="px-4 py-2 text-white">{f.plano}</td>
                        <td className="px-4 py-2 text-white">{f.dataAssinatura}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          {abaPainel === 'cadastrar-funcionario' && (
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Cadastrar Funcionário</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">Nome</label>
                <input
                  type="text"
                  value={formFuncionario.nomeFuncionario}
                  onChange={e => setFormFuncionario(f => ({ ...f, nomeFuncionario: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Nome do colaborador"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">CPF</label>
                <input
                  type="text"
                  value={formFuncionario.cpf}
                  onChange={e => setFormFuncionario(f => ({ ...f, cpf: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="CPF do colaborador"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">Número de Contato</label>
                <input
                  type="text"
                  value={formFuncionario.contato}
                  onChange={e => setFormFuncionario(f => ({ ...f, contato: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                  type="email"
                  value={formFuncionario.email}
                  onChange={e => setFormFuncionario(f => ({ ...f, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="email@colaborador.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-white">Quem define o plano?</label>
                <select
                  value={formFuncionario.escolhaPlano}
                  onChange={e => setFormFuncionario(f => ({ ...f, escolhaPlano: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="empresa">Empresa define</option>
                  <option value="colaborador">Colaborador escolhe</option>
                </select>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors">Cadastrar</button>
            </div>
          )}
        </main>
      </div>
    );
  }
};

export default AcademiaApp;