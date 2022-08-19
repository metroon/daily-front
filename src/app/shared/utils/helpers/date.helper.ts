import * as dateFns from "date-fns";
import { ptBR } from "date-fns/locale";

export module DateHelper {
  export function formatDate(date: string, format: string = "dd/MM/yyyy") {
    let dateFormated = '';
    if (date) {
      dateFormated = dateFns.format(new Date(date), format, { locale: ptBR });
      if (format === 'PPPP') {
        dateFormated = dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1);
      }
    }
    return dateFormated;
  }
}
