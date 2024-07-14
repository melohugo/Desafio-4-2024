import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import styles from './styles.module.css';
import BotaoCriarProprietario from '../../components/BotoesPages/BotaoCriarProprietario';
import BotaoSalvar from '../../components/BotoesForms/BotaoSalvar';

function HomeProprietario() {
  const [proprietarios, setProprietarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); 
  const [editFormData, setEditFormData] = useState({
    nome: '',
    cpf: '',
    categoriaCnh: '',
    vencimentoCnh: '',
  });

  useEffect(() => {
    const fetchProprietarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/proprietarios');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        setProprietarios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProprietarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/proprietarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o proprietário');
      }
      setProprietarios(prevProprietarios =>
        prevProprietarios.filter(proprietario => proprietario.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (proprietario) => {
    setEditingId(proprietario.id);
    setEditFormData({
      nome: proprietario.nome,
      cpf: proprietario.cpf,
      categoriaCnh: proprietario.categoriaCnh,
      vencimentoCnh: proprietario.vencimentoCnh,
    });
  };


  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/proprietarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar o proprietário');
      }
      setProprietarios(proprietarios.map(proprietario =>
        proprietario.id === id ? { ...proprietario, ...editFormData } : proprietario
      ));
      setEditingId(null);
      setEditFormData({
        nome: '',
        cpf: '',
        categoriaCnh: '',
        vencimentoCnh: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <>
      <div><BotaoCriarProprietario /></div>
      <h1 className={styles.h1}>Bem vindo ao Detran</h1>
      <h2 className={styles.h2}>Proprietários</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cpf</th>
              <th>Categoria Cnh</th>
              <th>Vencimento Cnh</th>
              <th>Veículos</th>
              <th>Multas</th>
              <th>Editar Motorista</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {proprietarios.map((proprietario) => (
              <tr key={proprietario.id}>
                <td>{editingId === proprietario.id ? (
                  <input
                    type="text"
                    value={editFormData.nome}
                    onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                  />
                ) : (
                  proprietario.nome
                )}</td>
                <td>{editingId === proprietario.id ? (
                  <input
                    type="text"
                    value={editFormData.cpf}
                    onChange={(e) => setEditFormData({ ...editFormData, cpf: e.target.value })}
                  />
                ) : (
                  proprietario.cpf
                )}</td>
                <td>{editingId === proprietario.id ? (
                  <input
                    type="text"
                    value={editFormData.categoriaCnh}
                    onChange={(e) => setEditFormData({ ...editFormData, categoriaCnh: e.target.value })}
                  />
                ) : (
                  proprietario.categoriaCnh
                )}</td>
                <td>{editingId === proprietario.id ? (
                  <input
                    type="text"
                    value={editFormData.vencimentoCnh}
                    onChange={(e) => setEditFormData({ ...editFormData, vencimentoCnh: e.target.value })} 
                  />
                ) : (
                  proprietario.vencimentoCnh
                )}</td>
                <td><button><Link to={`/veiculos/${proprietario.id}`}>🚗</Link></button></td> 
                <td><button><Link to={`/multas/${proprietario.id}`}>📘</Link></button></td>

                {/* Editar */}
                <td>{editingId === proprietario.id ? (
                  <button className={styles.buttonSalvar} onClick={() => handleSaveEdit(proprietario.id)}><BotaoSalvar /></button>
                ) : (
                  <button onClick={() => handleEdit(proprietario)}>✏️</button>
                )}</td>

                <td>
                  <button onClick={() => handleDelete(proprietario.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomeProprietario;
