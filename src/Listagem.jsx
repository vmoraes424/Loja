import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Listagem() {
  const [jogos, setJogos] = useState([]);
  const [preco, setPreco] = useState();
  const [avaliacoes, setAvaliacoes] = useState();
  const [titulo, setTitulo] = useState();
  const [ano, setAno] = useState();

  useEffect(() => {
    const jogosSalvos = localStorage.getItem("jogos");
    if (jogosSalvos) {
      setJogos(JSON.parse(jogosSalvos));
    }
  }, []);

  function adicionaJogo(e) {
    e.preventDefault();
    const novoJogo = {
      titulo: titulo,
      ano: ano,
      preco: preco,
      avaliacoes: avaliacoes,
    };
    setJogos([...jogos, novoJogo]);
    setAno("");
    setTitulo("");
    setPreco("");
    setAvaliacoes("");
    localStorage.setItem("jogos", JSON.stringify([...jogos, novoJogo]));
  }

  function verAvaliacoes(avaliacao) {
    Swal.fire({
      title: avaliacao,
      icon: "info",
      confirmButtonText: "OK",
    });
  }
  const jogosAdicionados = jogos.map((jogo) => (
    <tr key={jogo}>
      <td>
        <img src="./capa.png" alt="Capa do jogo" width={150} />
      </td>
      <td>
        <h2>{jogo.titulo}</h2>
        <p>{jogo.ano}</p>
        <h4 className="my-3">R${jogo.preco}</h4>
        <button
          className="btn btn-primary"
          onClick={() => verAvaliacoes(jogo.avaliacoes)}
        >
          Ver avaliação
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={adicionaJogo}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              id="titulo"
              placeholder="Título do jogo"
              required
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ano">Ano</label>
            <input
              type="year"
              className="form-control"
              value={ano}
              id="ano"
              required
              placeholder="Ano do jogo"
              onChange={(e) => setAno(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              className="form-control"
              value={preco}
              id="preco"
              required
              placeholder="Preço do jogo"
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avaliacoes">Avaliação</label>
            <input
              type="text"
              className="form-control"
              value={avaliacoes}
              required
              id="avaliacoes"
              placeholder="Escreva uma avaliação para o jogo"
              onChange={(e) => setAvaliacoes(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Adicionar
          </button>
        </form>
        <div className="row mt-3">
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Capa do Jogo</th>
                <th>Título e Detalhes dos Jogos</th>
              </tr>
            </thead>
            <tbody>{jogosAdicionados}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
