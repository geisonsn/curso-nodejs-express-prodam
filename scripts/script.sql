create sequence eixo_id_seq;

create table eixo (
	id integer not null default nextval('eixo_id_seq'),
	nome varchar(70) not null,
	primary key(id)
);

insert into eixo(nome) values ('INFORMAÇÃO E COMUNICAÇÃO');
insert into eixo(nome) values ('PRODUÇÃO CULTURAL E DESIGN');
insert into eixo(nome) values ('PRODUÇÃO ALIMENTÍCIA');

create sequence curso_id_seq;

create table curso(
	id integer not null default nextval('curso_id_seq'),
	eixo_id integer,
	nome varchar(70) not null,
	carga_horaria integer,
	vagas integer,
	vagas_reserva integer,
	primary key(id),
	foreign key(eixo_id) references eixo (id)
);

insert into curso(eixo_id, nome, carga_horaria, vagas, vagas_reserva)
values (1, 'Informática Básica', 100, 20, 10);
insert into curso(eixo_id, nome, carga_horaria, vagas, vagas_reserva)
values (2, 'Pedicure', 100, 20, 10);
insert into curso(eixo_id, nome, carga_horaria, vagas, vagas_reserva)
values (3, 'Culinária Básica', 100, 20, 10);