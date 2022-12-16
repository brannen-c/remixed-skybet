import { slugify } from "~/utils";
import { fetcher } from "./common";

export const getType = async (typeName: string) => {
  const res = await fetcher(
    `query EventType($eventTypeFilter: EventTypeFilter!, $eventFilter: EventFilter!) {
              eventTypes(filter: $eventTypeFilter) {
                name
                classId
                typeId
                eventClass {
                  name
                }
                events(filter: $eventFilter) {
                  eventId
                  name
                  startTime
                  displayOrder
                }
              }
            }
            `,
    {
      eventTypeFilter: { name: { EQ: typeName } },
      eventFilter: {
        status: { displayable: true },
      },
    }
  );
  const result = await res.json();
  const data: EventTypeData = result.data.eventTypes[0];

  return data;
};

export const getTypeId = async (typeName: string) => {
  const res = await fetcher(
    `query EventTypes($typeFilter: EventTypeFilter!) {
              eventTypes(filter: $typeFilter) {
                name
                classId
                typeId                
              }
            }
            `,
    {
      typeFilter: {
        name: { EQ: typeName },
      },
    }
  );
  const result = await res.json();

  const typeItem = result.data.eventTypes[0];

  const data: SlugifiedTypeData = {
    ...typeItem,
    slug: slugify(typeItem.name),
  };
  return data;
};

export interface TypeData {
  name: string;
  classId: number;
  typeId: number;
}
export interface SlugifiedTypeData extends TypeData {
  slug: string;
}

export interface EventTypeData {
  name: string;
  classId: number;
  typeId: number;
  eventClass: {
    name: string;
  };
  events: {
    eventId: number;
    name: string;
    displayOrder: number;
    startTime: string;
  }[];
}
