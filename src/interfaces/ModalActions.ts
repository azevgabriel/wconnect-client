export interface ModalActions<Data> {
  open: boolean;
  data?: Partial<Data>;
  action: "add" | "update" | "delete" | "none";
}
