import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

/**
 * Response data swagger docs
 *
 * Default errors for routes
 */
export const ApiErrorResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: "Invalid parameters",
      schema: {
        properties: {
          data: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              status: {
                type: "number",
              },
              statusText: {
                type: "string",
              },
              log: {
                type: "string",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: "Bussiness rule",
      schema: {
        properties: {
          data: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              status: {
                type: "number",
              },
              statusText: {
                type: "string",
              },
              log: {
                type: "string",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: "Forbidden",
      schema: {
        properties: {
          data: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              status: {
                type: "number",
              },
              statusText: {
                type: "string",
              },
              log: {
                type: "string",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: "Internal server error",
      schema: {
        properties: {
          data: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              status: {
                type: "number",
              },
              statusText: {
                type: "string",
              },
              log: {
                type: "string",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_GATEWAY,
      description: "Invalid response",
      schema: {
        properties: {
          data: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              status: {
                type: "number",
              },
              statusText: {
                type: "string",
              },
              log: {
                type: "string",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      },
    })
  );
};
