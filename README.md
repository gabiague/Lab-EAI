# Classificação de Sentimentos em Tweets sobre Companhias Aéreas ✈️💬

Este projeto implementa um **sistema modular** para **classificação automática de sentimentos** em tweets direcionados a companhias aéreas, utilizando técnicas de **Text Mining** e **Machine Learning**. O objetivo é identificar se os textos expressam sentimento **positivo**, **negativo** ou **neutro**, auxiliando empresas na análise de opiniões de clientes em redes sociais.

---

## 🔧 Funcionalidades Principais

- 📥 Importação e **pré-processamento automático** de datasets textuais (CSV)
- 🤖 Treinamento de modelos de **classificação supervisionada** (Naive Bayes e SVM)
- 🧠 Vetorização dos textos via **TF-IDF**
- 🧾 Classificação interativa de **novos tweets via terminal**
- 🗄️ Registro de resultados e modelos em **banco de dados MySQL**
- 🔁 **Feedback do utilizador**: reinserção de exemplos mal classificados para melhoria contínua
- 📊 Geração de métricas de desempenho (**acurácia**, **precisão**, **revocação**, **F1-score**)

---

## 🧱 Arquitetura Modular

- **Aquisição de Dados**: Scripts para importação e armazenamento em MySQL
- **Pré-processamento**: Limpeza, tokenização, remoção de stopwords e stemming
- **Seleção de Características**: Vetorização com TF-IDF
- **Classificação**: Algoritmos Naive Bayes (Multinomial) e SVM (kernel linear)
- **Avaliação e Feedback**: Métricas de desempenho e circuito de realimentação

---

## 💻 Tecnologias Utilizadas

- **Node.js** v22.7.0  
- **MySQL** 8.0+  
- **Bibliotecas**:  
  - `natural`  
  - `stopword`  
  - `mysql2`  
  - `dotenv`  
  - `readline-sync`  
  - `fs`, `path`  
- **Dataset**: [Airline Tweets - Kaggle](https://www.kaggle.com/datasets/crowdflower/twitter-airline-sentiment)

---

## 🚀 Como Usar

### 1. Clone o repositório e instale as dependências:

```bash
git clone <url-do-repo>
cd <pasta-do-projeto>
npm install
```

### 2. Configure o `.env` com as credenciais do banco MySQL.

### 3. Importe o dataset e treine o modelo:

```bash
node scripts/train.js
```

### 4. Classifique novos textos:

```bash
node scripts/classify.js
```

### 5. Dê feedback para exemplos mal classificados:

```bash
node scripts/feedback.js
```

---

## 💬 Exemplo de Uso

```text
Digite o tweet a ser classificado: "The flight was delayed and the service was terrible."
Classificação: Negativo
```

---

## ✅ Requisitos

- Node.js 22.7.0+
- MySQL Server 8.0+
- Sistema Operacional: **Windows**

---

## 📘 Documentação

Este projeto foi desenvolvido para **fins acadêmicos**, com ênfase em:

- Arquitetura limpa
- Manutenibilidade
- Integração entre módulos

Consulte o **Manual Técnico** e o **Manual do Utilizador** para detalhes completos de configuração, uso e análise dos resultados.
