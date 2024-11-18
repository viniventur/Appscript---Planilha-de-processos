/* 
***************** REGISTRO PROCESSO MAE *****************
Olá! Código feito por Vinícius Ventura - Analista de dados SUPCIE/CGE/AL - Insta: @vinicius.ventura_ - Github: https://github.com/viniventur
Código de Appscript do Planilhas Google (Google Sheets)
Última atualização: 18/11/2024
*/

function registro_proc_mae() { 

  // constantes
  const ss_base = SS.getSheetByName("Processos Mãe");
  const ss_registro = SS.getSheetByName("Registro de Processo Mãe");
  const intervalo_registro = 'B5:H5';
  const intervalo_base = 'B3:I3';
  const intervalo_bios_registro = 'K2:Q2';

  // Captura dos dados das colunas E e F - cabecalhos e valores
  const cabecalhos_dados = ss_registro.getRange('B4:H4').getValues().flat();
  const valores_dados = ss_registro.getRange('B5:H5').getValues().flat();
  const registro_completo = [cabecalhos_dados, valores_dados];

  const cabecalho = registro_completo[0];
  const valores = registro_completo[1];
  const valores_obrigatorios = verif_val_obrig(cabecalho, valores);


  // VERIFICACOES

  
  // Verificação de campos obrigatórios
  if (valores_obrigatorios.some(valor => valor === "")) {
    return mostrarAlerta("Requisitos obrigatórios vazios!");
  }
  
 
  // verificacao de formatacao de processo

  let proc_mae = ss_registro.getRange('C5').getValue();

  if (typeof proc_mae !== 'string') {
    return mostrarAlerta("Número de processo não está no formato correto (apenas números foram registrados)!");
  }

  proc_mae.replace(/\s+/g, '');
  ss_registro.getRange('C5').setValue(proc_mae);

  if (proc_mae.length !== 23) {
    return mostrarAlerta("Processo com formato errado!");
  }
  
  // verificacao de processo duplicado

  let base_processos_mae = ss_base.getRange(3, 3, ss_base.getLastRow(), 1).getValues().flat()

  if (base_processos_mae.indexOf(proc_mae) > -1) {
    return mostrarAlerta( "Processo mãe já consta na base!");
  } 


  // insercao 
  const intervalo_registro_1 = 'B5:C5';
  const intervalo_registro_2 = 'D5';
  const formula_bios = 'M2:P2';
  const range_formula = 'D3:G3';
  const intervalo_bios_registro_1 = 'K2:L2';
  const intervalo_bios_registro_2 = 'Q2';
  adicionar_registro_proc_mae(ss_base, intervalo_bios_registro_1, intervalo_bios_registro_2, intervalo_registro_1, intervalo_registro_2, formula_bios, range_formula, intervalo_base);


}
