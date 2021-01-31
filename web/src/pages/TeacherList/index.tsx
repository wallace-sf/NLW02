/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import shortId from 'shortid';
import * as Yup from 'yup';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import smileIcon from '../../assets/images/icons/smile.svg';

import './styles.css';

interface TeacherListProps {
  subject: string;
  week_day: string;
  time: string;
}

interface TeacherProps {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface ValidationErrorsProps {
  [path: string]: string;
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
  time: `${new Date().getHours()}:00`,
};

const TeacherList: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [teachers, setTeachers] = useState<TeacherProps[]>([]);
  const [isSubmitTouched, setIsSubmitTouched] = useState(false);

  const handleOnSubmit: SubmitHandler<TeacherListProps> = async data => {
    try {
      const schema = Yup.object().shape({
        time: Yup.string().required('O campo hora é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get('/classes', {
        params: data,
      });

      setTeachers(response.data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = err.inner.reduce(
          (acc: ValidationErrorsProps, error: Yup.ValidationError) => {
            acc[error.path] = error.message;

            return acc;
          },
          {},
        );

        if (formRef.current !== null) {
          formRef.current.setErrors(validationErrors);
        }
      }
    }

    if (isSubmitTouched === false) {
      setIsSubmitTouched(true);
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader name="Estudar">
        <section className="title-container">
          <strong>Estes são os proffys disponíveis.</strong>
          <div className="subtitle-right">
            <img src={smileIcon} alt="Smile" />
            <span>
              Nós temos 32
              <br />
              professores
            </span>
          </div>
        </section>
        <Form
          ref={formRef}
          onSubmit={handleOnSubmit}
          id="search-teachers"
          initialData={initialValues}
        >
          <Select name="subject" label="Matéria" options={optionsSubject} />
          <Select
            name="week_day"
            label="Dias da semana"
            options={optionsWeekDay}
          />
          <Input type="time" name="time" label="Hora" />
          <button type="submit">Buscar</button>
        </Form>
      </PageHeader>

      <main>
        {teachers.map(teacher => (
          <TeacherItem key={shortId()} teacher={teacher} />
        ))}
        {isSubmitTouched && !teachers.length && (
          <p className="no-teachers-text">
            Nenhum professor encontrado com sua pesquisa.
          </p>
        )}
      </main>
    </div>
  );
};

export default TeacherList;
