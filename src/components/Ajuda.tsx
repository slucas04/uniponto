import React from 'react'

const Ajuda = () => {
  return (
    <div className="Ajuda" id="Ajuda">
        <div style={{display: 'flex'}}>
        <img
            src={"LOGO-MARKER.png"}
            alt="LOGOTIPO"
            style={{ marginLeft: '0', width: '6rem', display: 'block' }}
        />
        <h2 style={{fontWeight: 'bolder', marginLeft: '1.5rem'}}>Como usar o UNIPONTO</h2>

        </div>
        <ul>
            <div style={{display: 'flex', gap: '3rem'}}>
                <div style={{width:'50%'}}>
                    <li>
                        <h3 style={{fontStyle: 'italic', fontSize: '1.5rem'}}>Lista de pontos cadastrados</h3>
                        <img
                            src={"LIST-ITEM.png"}
                            style={{ marginLeft: '0', width: '16rem', display: 'block', marginBottom: '1rem' }}
                        />
                        <p style={{marginBottom: '2.5rem'}}>Itens cadastrados na lista exibem informação de nome (cadastrado, pré-definido ou o número identificador), latitude e longitude do marcador. Você pode clicar no marcador na lista pra mudar o centro do mapa e encontrá-lo.</p>
                        
                    </li>
                    <li>
                        <h3 style={{fontStyle: 'italic', fontSize: '1.5rem'}}>Edição</h3>
                        <img
                            src={"MAPA-SATELITE.png"}
                            style={{ marginLeft: '0', width: '25rem', display: 'block', marginBottom: '1rem', borderRadius: '5px' }}
                        />
                        <p>Use os botões acima para alternar entre a visão de mapa e satelite do Google.</p>
                        <img
                            src={"DRAG-MARKER.png"}
                            style={{ marginLeft: '0', width: '10rem', display: 'block', marginBottom: '1rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '15px' }}
                        />
                        <p>Segure e arraste os marcadores para mudar as coordenadas dos que já existem no mapa.</p>
                    </li>
                </div>
                <div style={{width: '50%'}}>
                    <li>
                        <h3 style={{fontStyle: 'italic', fontSize: '1.5rem'}}>Adicionar marcadores</h3>
                        <p>Adicione um ponto no mapa inserindo as informações nos campos de texto ao lado esquerdo do mapa. Após inserir o nome, latitude e longitude, os pontos cadastrados aparecerão na lista ao lado. Se optar por usar o endereço, o ponto aparecerá no mapa com as informações de coordenadas na lista.</p>
                        <img
                            src={"RIGHT-CLICK.png"}
                            style={{ marginLeft: '0', width: '16rem', display: 'block', marginBottom: '1rem' }}
                        />
                        <p>Clique com o botão direito no mapa para adicionar um marcador nas coordenadas exatas de onde foi clicado.</p>
                    </li>
                    
                    <li>
                        <h3 style={{fontStyle: 'italic', fontSize: '1.5rem'}}>Repositório GitHub</h3>
                        <p>Acesse abaixo o código-fonte do projeto no repositório do Github.</p>
                            <a href="https://github.com/slucas04/uniponto" target="_blank" style={{display: 'flex', backgroundColor: 'white', borderRadius: '15px', width: '11rem', padding: '1rem', textDecoration: 'none', color: 'black', marginTop: '2rem'}}>
                                <img
                                    src={"GITHUB-LOGO.png"}
                                    style={{ width: '3rem', height: '3rem', display: 'block'}}
                                />
                                <p style={{marginLeft: '1rem', fontSize: '1rem'}}>Repositório</p>
                            </a>
                    </li>
                </div>
            </div>
        </ul>
    </div>
  )
}

export default Ajuda
