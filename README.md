# neonCity: Administrando a Cidade (Objeto de Aprendizagem)

**Tema:** Banco de Dados Relacional

**Metodologia:** AM-OER e Taxonomia de Bloom

---

## Sobre o neonCity

O neonCity é um Objeto de Aprendizagem gamificado, desenvolvido em React, que coloca o usuário no controle de uma metrópole futurista. O objetivo é ensinar os fundamentos de Banco de Dados de forma prática, visual e imersiva.

Para salvar a cidade, o jogador não utiliza botões comuns, mas sim um Terminal de Comando SQL funcional que interage com um banco de dados real em memória.

---

## Público-alvo

Estudantes do Ensino Médio / Superior que queiram aprender sobre gerenciamento de banco de dados.

---

## Tecnologias Utilizadas

- **React + Vite**: Framework principal.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Material UI**: Biblioteca de componentes e estilização baseada em temas.
- **SQL.js**: Motor SQLite compilado para WebAssembly, permitindo a execução de consultas SQL reais no navegador.

---

## Estrutura de Arquivos e Construção

Para reconstruir ou modificar este projeto, os seguintes arquivos são essenciais:

1.  **`src/App.tsx`**: O cérebro da aplicação. Gerencia o estado do jogo, inicializa o banco de dados e coordena os componentes.
2.  **`src/missoes.ts`**: Arquivo de configuração pedagógica. Contém todos os tutoriais, textos das missões e as funções de validação (condições de vitória).
3.  **`src/types.ts`**: Definições de interfaces TypeScript para garantir a integridade dos dados entre componentes.
4.  **`src/theme.ts`**: Configuração central da estética "Neon/Cyberpunk" através do ThemeProvider do MUI.
5.  **`src/components/`**:
    - `MenuPrincipal.tsx`: Tela de boas-vindas.
    - `MapaHolografico.tsx`: Visualização interativa dos setores da cidade.
    - `ModalResultado.tsx`: Painel flutuante para exibição de dados tabulares.
    - `DicionarioDados.tsx`: Guia de referência de tabelas e atributos para o aluno.

---

## Guia de Instalação e Execução

1.  **Clonar o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/neoncity.git](https://github.com/seu-usuario/neoncity.git)
    ```

2.  **Instalar dependências:**

    ```bash
    npm install
    ```

3.  **Executar o projeto:**
    ```bash
    npm run dev
    ```

---

## Como Customizar para Outros Assuntos

Por ser um Objeto de Aprendizagem componentizado, o neonCity pode ser facilmente transformado em outros cenários (ex: Corpo Humano, Sistema Solar ou Gestão Escolar).

Para alterar o assunto:

1.  **Base de Dados**: No `App.tsx`, altere os comandos `CREATE TABLE` e `INSERT INTO` dentro do `useEffect` para criar o novo cenário.
2.  **Pedagogia**: No `missoes.ts`, substitua os tutoriais e a lógica de validação na função `verificarSucesso`.
3.  **Visual**: No `theme.ts`, altere as cores principais para condizer com o novo tema.

---

## Objetivos Educacionais

- **Lembrar/Entender**: Identificar tabelas e atributos necessários para monitorar indicadores.
- **Aplicar**: Executar filtros específicos (WHERE) para localizar anomalias.
- **Analisar**: Utilizar funções de agregação (SUM, COUNT) e ordenação (ORDER BY) para priorizar intervenções.
- **Criar/Sintetizar**: Construir comandos de manipulação (UPDATE, INSERT, DELETE) para solucionar crises.

---

## Documentação Pedagógica

### Onde acessar

A versão funcional pode ser encontrada pelo link:

### Mapa Conceitual

Acesse a estrutura lógica do aprendizado:  
[Visualizar Mapa Conceitual](https://cmapscloud.ihmc.us/viewer/cmap/22KK7885F-GLPJXJ-F7C2X1)

### Modelo Instrucional (AM-OER)

A progressão de aprendizado segue o modelo de Sprints:

1. **Exploração**: Busca básica de dados.
2. **Análise**: Ordenação e Agrupamento.
3. **Intervenção**: Modificação de registros.

![](/src/assets/mapa-instrucional.png)

---

## Gabarito para Administradores

<details>
<summary>Clique para ver as respostas das missões</summary>

**Sprint 1:**

1. `SELECT * FROM setores WHERE status_seguranca = 'CRITICO';`
2. `SELECT * FROM incidentes WHERE tipo = 'CIBERATAQUE';`
3. `SELECT * FROM energia_reatores WHERE carga_atual < 20;`
4. `SELECT * FROM equipes_resgate WHERE disponivel = 'NAO';`

**Sprint 2:**

1. `SELECT * FROM setores WHERE status_seguranca = 'CRITICO' ORDER BY populacao DESC;`
2. `SELECT SUM(populacao) FROM setores WHERE status_seguranca = 'CRITICO';`
3. `SELECT * FROM energia_reatores ORDER BY carga_atual ASC;`
4. `SELECT especialidade, COUNT(*) FROM equipes_resgate GROUP BY especialidade;`

**Sprint 3:**

1. `UPDATE setores SET status_seguranca = 'ESTAVEL' WHERE status_seguranca = 'CRITICO';`
2. `DELETE FROM incidentes WHERE tipo = 'CIBERATAQUE';`
3. `INSERT INTO equipes_resgate VALUES (4, 'MEDICA', 4, 'SIM');`
4. `UPDATE energia_reatores SET carga_atual = 100, status_operacao = 'NORMAL' WHERE carga_atual < 20;`

</details>

---
