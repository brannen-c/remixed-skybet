import { slugify } from "~/utils";
import { fetcher } from "./common";

export const getClasses = async () => {
  const res = await fetcher(
    `query EventClasses($eventClassFilter: EventClassFilter!, $eventFilter:EventFilter!){
                eventClasses(filter: $eventClassFilter) {
                    classId
                    name
                    displayOrder
                    events (filter: $eventFilter) @discard(if: true){
                    id      
                    }
                }
                }`,
    {
      eventClassFilter: { HAS: "events" },
      eventFilter: { status: { resulted: false, displayable: true } },
    }
  );
  const result = await res.json();
  const data: EventClassData<EventClass> = {
    eventClasses: result.data.eventClasses,
  };
  return data;
};

export const getAllClasses = async () => {
  const res = await fetcher(`query EventClasses{
                eventClasses {
                    classId
                    name
                    displayOrder                   
                }
                }`);
  const result = await res.json();

  const eventClasses: SlugifiedEventClass[] = result.data.eventClasses.map(
    (c: EventClass) => {
      return { ...c, slug: slugify(c.name) };
    }
  );

  const data: EventClassData<SlugifiedEventClass> = {
    eventClasses,
  };
  return data;
};

export const getClass = async (classId: string) => {
  const res = await fetcher(
    `query EventClass($classId: Int!, $eventFilter: EventFilter!) {
            eventClass(classId: $classId) {
                classId
                name
                events(filter: $eventFilter) {
                    eventId
                    typeId
                    eventType {
                      name
                    }
                    name
                    displayOrder
                    startTime
                }
            }
            }
            `,
    {
      classId,
      eventFilter: { status: { displayable: true } },
    }
  );
  const result = await res.json();
  const data: EventClassWithEvents = result.data.eventClass;

  return data;
};

export const getClassName = async (classId: string) => {
  const res = await fetcher(
    `query EventClassName($classId : Int!) {
      eventClass(classId: $classId) {
                  classId
                  name
                }
            }
  `,
    { classId }
  );
  const result = await res.json();
  const data: SlugifiedEventClass = {
    ...result.data.eventClass,
    slug: slugify(result.data.eventClass.name),
  };
  return data;
};

export const getClassId = async (className: string) => {
  const res = await fetcher(
    `query EventClasses($eventClassFilter: EventClassFilter!) {
      eventClasses(filter: $eventClassFilter) {
                  classId
                  name
                }
            }
  `,
    { eventClassFilter: { name: { EQ: className } } }
  );
  const result = await res.json();
  const classItem = result.data.eventClasses[0];

  const data: SlugifiedEventClass = {
    ...classItem,
    slug: slugify(classItem.name),
  };
  return data;
};

export async function getClassEvents(className: string) {
  const res = await fetcher(
    `query EventClasses($eventClassFilter: EventClassFilter!, $eventFilter: EventFilter!) {
            eventClasses(filter: $eventClassFilter) {
                classId
                name
                events(filter: $eventFilter) {
                    eventId
                    typeId
                    eventType {
                      name
                    }
                    name
                    displayOrder
                    startTime
                }
            }
            }
            `,
    {
      eventClassFilter: { name: { EQ: className } },
      eventFilter: { status: { displayable: true } },
    }
  );
  const result = await res.json();
  const data: EventClassWithEvents[] = result.data.eventClasses;

  return data[0];
}

export interface EventClassData<T extends EventClass> {
  eventClasses: T[];
}

export interface EventClass {
  classId: number;
  name: string;
  displayOrder: number;
}

export interface SlugifiedEventClass extends EventClass {
  slug: string;
}

export interface EventClassWithEvents extends EventClass {
  events: {
    eventId: number;
    typeId: number;
    eventType: {
      name: string;
    };
    name: string;
    displayOrder: number;
    startTime: string;
  }[];
}
