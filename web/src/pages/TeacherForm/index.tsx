/* eslint-disable no-alert */
/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ld from 'lodash';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import {
  loadImage,
  getImageOrientation,
} from '../../utils/getImageOrientation';
import api from '../../services/api';
import { phoneMask } from '../../utils/phone';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import defaultAvatar from '../../assets/images/default-avatar.png';

import './styles.css';

interface TeacherFormProps {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  scheduleItems: Array<{
    week_day: string;
    from: string;
    to: string;
  }>;
}

interface ScheduleItemsProps {
  week_day: string;
  from: string;
  to: string;
}

const optionsSubject = [
  { value: 'artes', label: 'Artes' },
  { value: 'biologia', label: 'Biologia' },
  { value: 'ciencias', label: 'Ciências' },
  { value: 'educacao_fisica', label: 'Física' },
  { value: 'fisica', label: 'Educação física' },
  { value: 'geografia', label: 'Geografia' },
  { value: 'historia', label: 'História' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'quimica', label: 'Química' },
];

const optionsWeekDay = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

const initialValues = {
  name: '',
  avatar: '',
  whatsapp: '',
  bio: '',
  subject: '',
  cost: '',
  from: '',
  to: '',
};

const TeacherForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState<ScheduleItemsProps[]>([]);
  const [avatarOrientation, setAvatarOrientation] = useState('landscape');

  const handleAddNewScheduleItem = () => {
    const newScheduleItem: ScheduleItemsProps = {
      week_day: String(scheduleItems.length),
      from: '08:00 AM',
      to: '4:00 PM',
    };

    setScheduleItems(prevState => [...prevState, newScheduleItem]);
  };

  const handleRemoveScheduleItem = (itemIdx: number) => {
    const cloneScheduleItems = ld.cloneDeep(scheduleItems);
    cloneScheduleItems.splice(itemIdx, 1);

    return setScheduleItems(cloneScheduleItems);
  };

  const handleOnSubmit: SubmitHandler<TeacherFormProps> = (data, { reset }) => {
    const formattedData = { ...data, cost: Number(data.cost) };

    api
      .post('/classes', formattedData)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/home');
      })
      .catch(() => alert('Erro no cadastro.'));

    reset();
  };

  useEffect(() => {
    loadImage('').then(response =>
      setAvatarOrientation(getImageOrientation(response)),
    );
  }, []);

  return (
    <div id="page-teacher-form" className="container form">
      <PageHeader
        name="Dar aulas"
        headerContentStyle={{ paddingTop: '6.4rem', paddingBottom: '9.6rem' }}
      >
        <strong>Que incrível que você quer dar aulas.</strong>
        <section>
          <p>O primeiro passo é preencher este formulário de inscrição.</p>
          <div className="subtitle-right">
            <img src={rocketIcon} alt="Foguete" />
            <span>
              Prepara-se!
              <br />
              Vai ser o máximo
            </span>
          </div>
        </section>
      </PageHeader>

      <main>
        <Form
          ref={formRef}
          initialData={initialValues}
          onSubmit={handleOnSubmit}
        >
          <fieldset>
            <legend>Seus dados</legend>
            <div className="input-group">
              <div className="avatar-container">
                <div className="mask-avatar">
                  <img
                    src={defaultAvatar}
                    className={`${avatarOrientation}`}
                    alt="Avatar"
                  />
                </div>
                <span>Tiago Luchtenberg</span>
              </div>
              <InputMask
                name="whatsapp"
                label="Whatsapp"
                fnMask={phoneMask}
                type="tel"
                guide={false}
                placeholder="Ex: (11) 1234-5678"
                containerStyle={{ maxWidth: '22.4rem' }}
              />
            </div>
            <TextArea
              name="bio"
              label="Biografia"
              hint="Máximo 300 caracteres"
              maxLength={300}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="input-group">
              <Select name="subject" label="Matéria" options={optionsSubject} />
              <Input
                type="number"
                name="cost"
                label="Custo da sua hora por aula"
                placeholder="Ex: R$ 20,00"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, idx) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name={`schedule.${idx}.week_day`}
                  label="Dias da semana"
                  options={optionsWeekDay}
                />
                <Input type="time" name={`schedule.${idx}.from`} label="Das" />
                <Input type="time" name={`schedule.${idx}.to`} label="Até" />
                <div className="remove-schedule-item-container">
                  <hr />
                  <button
                    type="button"
                    onClick={() => handleRemoveScheduleItem(idx)}
                  >
                    Excluir horário
                  </button>
                  <hr />
                </div>
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados corretamente
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </Form>
      </main>
    </div>
  );
};

export default TeacherForm;
