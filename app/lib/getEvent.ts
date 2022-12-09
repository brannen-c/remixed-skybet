import { fetcher } from "./common";

export interface EventData {
  event: {
    name: string;
    eventId: number;
    markets: {
      marketId: number;
      name: string;
      displayOrder: number;
      outcomes: {
        outcomeId: number;
        name: string;
        status: {
          displayable: boolean;
        };
        price: {
          num: number;
          den: number;
          decimal: number;
        };
      }[];
    }[];
  };
}

export const getEvent = async (eventId: string) => {
  const res = await fetcher(
    `query Event($eventId: Int!, $marketFilter: MarketFilter!) {
            event(eventId: $eventId) {
                eventId
                name
                markets(filter: $marketFilter) {
                marketId
                name
                displayOrder
                outcomes {
                  outcomeId
                  name
                  status {
                    displayable
                  }
                  price {
                    num
                    den
                    decimal
                  }
                }
                }
            }
            }
            `,
    {
      eventId,
      marketFilter: { status: { displayable: true } },
    }
  );

  const result = await res.json();

  const data: EventData = {
    event: result.data.event,
  };
  return data;
};
