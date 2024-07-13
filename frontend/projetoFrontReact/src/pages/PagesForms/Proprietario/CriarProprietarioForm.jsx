import React, { useState } from 'react';
import styles from './styles.module.css';
import BotaoCriarProprietario from '../../../components/BotaoSair/BotaoSairProprietario';
import BotaoSalvar from '../../../components/BotoesForms/BotaoSalvar';

function CriarProprietarioForm() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>Proprietário</h1>
                        <form>
                            <label>
                                <p>Nome:</p>
                                <input type="text" name="nome" />
                            </label>
                            <br />

                            <label>
                                <p>CPF:</p>
                                <input type="text" name="cpf" />
                            </label>
                            <br />

                            <label>
                                <p>Categoria cnh:</p>
                                <input type="text" name="Categoria cnh:" />
                            </label>
                            <br />

                            <label>
                                <p>Vencimento CNH:</p>
                                <input type="text" name="Vencimento cnh:" />
                            </label>
                            <br />

                            <BotaoSalvar />
                            <BotaoCriarProprietario onClose={handleCloseModal} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CriarProprietarioForm;