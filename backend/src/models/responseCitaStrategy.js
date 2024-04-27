class ResponseStrategy {
    buildResponse(success, citasList, error) {
      return {
        success: success,
        list: citasList.map(cita => ({
          id_cita: cita.id_cita,
          doctor: cita.doctor,
          Descripcion: cita.descripcion,
          estado: this.mapEstado(cita.estado),
          fecha: cita.fecha,
          hora: cita.hora,
        })),
        error: error,
      };
    }
  
    mapEstado(estado) {
      switch (estado) {
        case 0:
          return "En espera";
        case 1:
          return "Agendado";
        case 2:
          return "Atendido";
        case 3:
          return "Cancelada";
        default:
          return "Desconocido";
      }
    }
  }
  
  class SuccessResponseStrategy extends ResponseStrategy {
    buildResponse(success, citasList, error) {
      return {
        success: success,
        list: citasList.map(cita => ({
          id_cita: cita.id_cita,
          doctor: cita.doctor,
          Descripcion: cita.descripcion,
          estado: this.mapEstado(cita.estado),
          fecha: cita.fecha,
          hora: cita.hora,
        })),
      };
    }
  }
  
  class listCitaStrategy extends ResponseStrategy {
    buildResponse(success, citasList, error) {
      return {
        list: citasList.map(cita => ({
          id_cita: cita.id_cita,
          doctor: cita.doctor,
          Descripcion: cita.descripcion,
          estado: this.mapEstado(cita.estado),
          fecha: cita.fecha,
          hora: cita.hora,
        })),
      };
    }
  }

  class listCitaEsperaStrategy extends ResponseStrategy {
    buildResponse(success, citasList, error) {
      return {
        list: citasList.map(cita => ({
          id_cita: cita.id_cita,
          paciente: cita.paciente,
          Descripcion: cita.descripcion,
          estado: this.mapEstado(cita.estado),
          fecha: cita.fecha,
          hora: cita.hora,
        })),
      };
    }
  }
  
  module.exports = {
    SuccessResponseStrategy,
    listCitaStrategy,
    listCitaEsperaStrategy,
    ResponseStrategy
  };
  