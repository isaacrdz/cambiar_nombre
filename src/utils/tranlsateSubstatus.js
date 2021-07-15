export const translateSubstatus = (value) => {
    let translatedValue = '';

    if(!value) return ''

    translatedValue = value.replace("frontdesk", "Recepción")
    translatedValue = translatedValue.replace("frontdesk", "Recepción")
    translatedValue = translatedValue.replace("visit_followup", "Seguimiento")
    translatedValue = translatedValue.replace("visit_rejected", "Visita Rechazada")
    translatedValue = translatedValue.replace("separated", "Realizó Separación")
    translatedValue = translatedValue.replace("rejected_application", "Solicitud Rechazada")
    translatedValue = translatedValue.replace("conditioned_application", "Solicitud Condicionada")
    translatedValue = translatedValue.replace("approved_application", "Solicitud Aprobada")
    translatedValue = translatedValue.replace("application", "Llenó Solicitud")
    translatedValue = translatedValue.replace("sold", "Venta")
    translatedValue = translatedValue.replace("documentation", "Documentación")
    translatedValue = translatedValue.replace("rejected", "Rechazo")
    translatedValue = translatedValue.replace("wrongnumber", "Número Equivocado")
    translatedValue = translatedValue.replace("client_na", "Cliente N/A")
    translatedValue = translatedValue.replace("reschedule", "Reagendada")
    translatedValue = translatedValue.replace("visited", "Visita Exitosa")
    translatedValue = translatedValue.replace("visit_tracking", "Seguimiento")
    translatedValue = translatedValue.replace("confirmed", "Confirmada")
    translatedValue = translatedValue.replace("confirm", "Confirmada")
    translatedValue = translatedValue.replace("callagain", "Llamar de nuevo")
    translatedValue = translatedValue.replace("followup", "Seguimiento")
    translatedValue = translatedValue.replace("new", "Nuevo")
    return translatedValue;
}


export const translateStatus = (value) => {
    let translatedValue = '';
    if(!value) return ''

    translatedValue = value.replace("visit", "Visita")
    translatedValue = translatedValue.replace("sold", "Venta")
    translatedValue = translatedValue.replace("appointment", "Cita")
    return translatedValue;
}

export const translateTemperature = (value) => {
    let translatedValue = '';
    if(!value) return ''

    translatedValue = value.replace("hot", "Caliente")
    translatedValue = translatedValue.replace("cold", "Frío")
    translatedValue = translatedValue.replace("warm", "Tibio")
    translatedValue = translatedValue.replace("none", "None")
    return translatedValue;
}

export const translateHistory = (string) => {
    string = string.replace("has made a phone call to", "ha hecho una llamada a");
    string = string.replace("has made an Appointment", "ha hecho una cita");
    string = string.replace("has leave a comment", "ha dejado un comentario");
    string = string.replace("has set status to", "ha cambiado el estatus a");
    string = string.replace("has sent documentation", "ha enviado documentación");
    string = string.replace("has reschedule a task", "ha reagendado una tarea");
    string = string.replace("for", "para");
    string = string.replace("send a whatsapp", "envió un whatsapp");
    string = string.replace("has assigned the lead to", "ha asignado el lead a");
    string = string.replace("has assing the lead to", "ha asignado el lead a");
    string = string.replace("has updated the Lead", "ha actualizado el Lead");
    string = string.replace("has sent a mail", "ha enviado un correo");
    string = string.replace("has made a videocall", "ha hecho una videollamada");
    string = string.replace("create a conversation", "ha creado una conversación");
    string = string.replace("has edited the Invoice", "ha editado la Factura");
    string = string.replace("has created an Invoice", "ha creado una Factura");
    string = string.replace("Client has visited the store. Qr Code scanned by", "Cliente ha visitado la agencia. Código Qr escaneado por");

    string = string.replace("Visited", "Visita Exitosa");
    string = string.replace("Callagain", "Llamar de Nuevo");
    string = string.replace("Wrongnumber", "Número Equivocado");
    string = string.replace("Application", "Llenó Solicitud");
    string = string.replace("Rejected", "Rechazado");
    string = string.replace("Separated", "Realizó Separación");
    string = string.replace("Confirm", "Confirmada");

    string = string.replace("Approved_application", "Solicitud Aprobada");
    string = string.replace("Conditioned_application", "Solicitud Condicionada");
    string = string.replace("Rejected_application", "Solicitud Rechazada");
    string = string.replace("Approved_application2", "Aprobada");
    string = string.replace("Conditioned_application2", "Condicionada");
    string = string.replace("Rejected_application2", "Rechazada");


    string = string.replace("Followup", "Seguimiento");
    string = string.replace("Missedappointment", "Missed Appointment");
    string = string.replace("Confirmedappointment", "Cita Confirmada");
    string = string.replace("Visit_tracking", "Seguimiento de Visita");
    string = string.replace("New", "Nuevo");
    string = string.replace("Sold", "Vendido");
    string = string.replace("Opened", "Abierto");
    string = string.replace("Visit", "Visita");
    string = string.replace("Appointment", "Cita");
    string = string.replace("Documentation", "Documentación");

    string = string.replace("create a conversation", "has sent a whatsapp");
    string = string.replace("from mobile App", "from mobile App");

    string = string.replace("has change the status to success", "has change the status to success");
    string = string.replace("has rejected the sale", "has rejected the sale");
    string = string.replace("has added an Invoice", "has added an invoice");
    string = string.replace("from conversations", "from conversations");

    
    return string;
  }

  export const translateActions = (value) =>{
    let translatedValue = '';

    if(!value) return ''
    translatedValue = value.replace("information", "Información")
    translatedValue = translatedValue.replace("documentation", "Documentarción")
    translatedValue = translatedValue.replace("driving test", "Prueba de Manejo")
    
    return translatedValue;

  }