/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ld from 'lodash';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';
import InputAvatar from '../../components/InputAvatar';

import { phoneMask } from '../../utils/phone';

import backgroundHeader from '../../assets/images/backgroundHeader.svg';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

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

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [scheduleItems, setScheduleItems] = useState<ScheduleItemsProps[]>([]);

  const handleOnSubmit: SubmitHandler = (data, { reset }) => {
    console.log(data);

    reset();
  };

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

  return (
    <div id="page-profile" className="form">
      <Form ref={formRef} initialData={initialValues} onSubmit={handleOnSubmit}>
        <PageHeader
          name="Meu perfil"
          headerContentStyle={{
            minWidth: 1110,
            backgroundImage: `url(${backgroundHeader})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        >
          <InputAvatar name="avatar" />
          <strong>Tiago Luchtenberg</strong>
          <h3>Geografia</h3>
        </PageHeader>
        <main>
          <fieldset>
            <legend>Seus dados</legend>
            <div className="input-group">
              <Input name="name" label="Nome" placeholder="Ex: João" />
              <Input
                name="last_name"
                label="Sobrenome"
                placeholder="Ex: Carraro"
              />
            </div>
            <div className="input-group">
              <Input
                type="email"
                name="email"
                label="E-mail"
                placeholder="Ex: email@email.com"
              />
              <InputMask
                name="whatsapp"
                label="Whatsapp"
                fnMask={phoneMask}
                type="tel"
                guide={false}
                placeholder="Ex: (11) 1234-5678"
              />
            </div>
            <TextArea
              name="bio"
              label="Biografia"
              hint="Máximo 300 caracteres"
              maxLength={300}
              placeholder="Ex: Amante de ciências naturais, estou na universidade de Cambridge..."
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
                min="0"
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
        </main>
      </Form>
    </div>
  );
};

export default Profile;
