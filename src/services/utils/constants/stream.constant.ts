import { StreamType } from "../enum/stream.enum";
import { Stream } from "../models/model.interface";

export const DataStream : Stream[] = [
    {
        id: "6",
        name: "Live",
        code: "live",
        detail: "La transmisión es unidireccional y abierta, solo los anfitriones tienen voz, es recomendado para eventos  masivos de hasta 50000 asistentes",
        tag: StreamType.live,
    },
    {
        id: "2",
        name: "Zoom",
        code: "zoom",
        detail: "La videoconferencia es bidireccional, es decir se puede entablar una conversación entre el anfitrión y los asistentes",
        tag: StreamType.zoom,
    },
    {
        id: "3",
        name: "Jitsi",
        code: "jitsi",
        detail: "La videoconferencia es para un número de personas limitada y es bidireccional, es decir se puede entablar una conversación entre el anfitrión y los asistentes.",
        tag: StreamType.jitsi,
    },
    {
        id: "5",
        name: "Google Meet",
        code: "googleMeet",
        detail: "La video conferencia es para un número de personas limitada y es bidireccional, es decir se puede entablar una conversación entre el anfitrión y los asistentes.",
        tag: StreamType.meet,
    },
    {
        id: "8",
        name: "Presencial",
        code: "meetPerson",
        detail: "Reunion presencial",
        tag: StreamType.prec,
    }
]