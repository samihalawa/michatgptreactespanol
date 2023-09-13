import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

function App() {

  const configuracion = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
  }); 

  const openAI = new OpenAIApi(configuracion);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    setLoading(true); 

    try {
      const response = openAI.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      })
      setResult((await response).data.choices[0].text);
      setLoading(false);
    }catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  return (
    <div className="App">
      <main>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2>Nube ChaGPT by Nube Colectiva</h2>
              {
                result.length > 0 && <div id='resultados' className='alert alert-success' role='alert'>{result}</div>
              }
              <div className='mb-3'>
                <textarea type='text' className='form-control' rows='5' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Escribe tu Consulta'></textarea>
              </div>
            </div>
          </div>
        </div>
      </main>
      <button type='button' className='btn btn-primary' onClick={handleClick} disabled = {loading || prompt.length === 0}>{loading ? "Enviando..." : "Enviar"}</button>
    </div>
  );
}

export default App;
