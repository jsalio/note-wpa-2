import { EventData } from "../models/db/event";
import { EntityContexts } from "./context";


export class EventDataContext {
    table: string;
    context: EntityContexts;
    /**
     *
     */
    constructor() {
        this.table = 'Events';
        this.context = new EntityContexts()
    }

    public getAllEvents(): Promise<EventData[]> {
        return this.context.getAll(this.table)
    }

    public geEventByKey(key: string): Promise<EventData> {
        return this.context.get(this.table, key)
    }

    public addEvent(key: string, note: EventData): Promise<any> {
        return this.context.set(this.table, key, note)
    }
    public deleteEvent(key: string): Promise<void> {
        return this.context.del(this.table, key)
    }

    public cleanAllEvent(): Promise<void> {
        return this.context.clear(this.table)
    }

    public getAllEventKey(): Promise<any[]> {
        return this.context.keys(this.table)
    }

}