/* eslint-disable @typescript-eslint/no-unused-vars */
export class MockCrewmanRepository {
  getAll() {}
  get(_id: string) {}
  create(_model: any) {}
  remove(_id: string) {}
  update(_id: string, _dto: any) {}
}

export class MockSpaceshipRepository {
  getAll() {}
  get(_id: string) {}
  existsWithName(_name: string) {}
  create(_model: any) {}
  remove(_id: string) {}
  update(_id: string, _dto: any) {}
}
