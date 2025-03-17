export const buildOperationBuffer = (operationName: string, metadata: Record<string, unknown>) => {
  const paramData = JSON.stringify(metadata);

  const operationBuffer = Buffer.alloc(
    1 + // discriminator
    4 + operationName.length + // length prefix + operation name
    4 + paramData.length // length prefix + param data
  );

  let offset = 0;

  // Write discriminator
  operationBuffer.writeUInt8(0x01, offset);
  offset += 1;

  // Write operation name length and data
  operationBuffer.writeUInt32LE(operationName.length, offset);
  offset += 4;
  operationBuffer.write(operationName, offset);
  offset += operationName.length;
  
  // Write param data length and data
  operationBuffer.writeUInt32LE(paramData.length, offset);
  offset += 4;
  operationBuffer.write(paramData, offset);

  return operationBuffer;
}