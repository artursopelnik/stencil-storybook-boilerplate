import { html } from "lit"
import type { Meta, StoryObj } from "@storybook/web-components-vite"

// @ts-expect-error because Intellij does not understand imports within Lerna monorepos
import type {
  SsbTable,
  TableColumn,
  TableRow,
} from "@stencil-storybook-boilerplate/core/src/components/ssb-table/ssb-table"

type Args = SsbTable & { columns: TableColumn[]; rows: TableRow[] }

const invoiceColumns: TableColumn[] = [
  { key: "invoice", header: "Invoice" },
  { key: "status", header: "Status" },
  { key: "method", header: "Method" },
  { key: "amount", header: "Amount", align: "right" },
]

const invoiceRows: TableRow[] = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
]

const meta = {
  title: "Components/Table",
  parameters: {
    layout: "centered",
  },
  args: {
    columns: invoiceColumns,
    rows: invoiceRows,
    caption: "A list of your recent invoices.",
    striped: false,
    compact: false,
  },
} satisfies Meta<Args>

export default meta

export const Default = {
  render: ({ columns, rows, caption, striped, compact }: Args) =>
    html`<ssb-table
      columns=${JSON.stringify(columns)}
      rows=${JSON.stringify(rows)}
      caption=${caption ?? ""}
      ?striped=${striped}
      ?compact=${compact}
      style="width: 32rem;"
    ></ssb-table>`,
} satisfies StoryObj<Args>

export const Striped = {
  render: () =>
    html`<ssb-table
      columns=${JSON.stringify(invoiceColumns)}
      rows=${JSON.stringify(invoiceRows)}
      ?striped=${true}
      style="width: 32rem;"
    ></ssb-table>`,
} satisfies StoryObj<Args>

export const Compact = {
  render: () =>
    html`<ssb-table
      columns=${JSON.stringify(invoiceColumns)}
      rows=${JSON.stringify(invoiceRows)}
      ?compact=${true}
      style="width: 32rem;"
    ></ssb-table>`,
} satisfies StoryObj<Args>
