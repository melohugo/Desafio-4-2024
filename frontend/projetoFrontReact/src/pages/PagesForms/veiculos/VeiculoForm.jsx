import React from 'react';
import styles from './styles.module.css';
import BotaoSalvar from '../../../components/BotoesForms/BotaoSalvar';
import BotaoSairVeiculo from '../../../components/BotaoSair/BotaoSairVeiculo';

function VeiculoForm() {
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>Veiculo do []</h1>
                        <form>
                            <label>
                                <p>Placa:</p>
                                <input type="text" name="Placa" />
                            </label>
                            <br />
                            <label>
                                <p>Marca:</p>
                                <input type="text" name="Marca" />
                            </label>
                            <br />
                            <label>
                                <p>Modelo:</p>
                                <input type="text" name="Modelo" />
                            </label>
                            <br />
                            <label>
                                <p>Ano:</p>
                                <input type="text" name="Ano" />
                            </label>
                            <br />
                            <label>
                                <p>Cor:</p>
                                <input type="text" name="Cor" />
                            </label>
                            <br />
                            {/* Não é botão salvar, é Botão criar */}
                            <BotaoSalvar />
                            <BotaoSairVeiculo />

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default VeiculoForm;
