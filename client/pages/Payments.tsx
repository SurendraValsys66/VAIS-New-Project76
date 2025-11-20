import React, { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  CheckCircle,
  Plus,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DateRangePicker as RsuiteDateRangePicker } from "rsuite";

interface PaymentRow {
  id: string;
  transactionDate: string;
  invoiceId: string;
  paymentMethod: string;
  type: string;
  plan: string;
  currency: string;
  invoiceAmount: number;
  serviceProvider: string;
}

interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "paypal" | "bank_transfer";
  cardNetwork?: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
  lastUsed: string;
  status: "active" | "expired" | "inactive";
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "credit_card",
    cardNetwork: "Visa",
    cardNumber: "4421",
    expiryDate: "12/25",
    cardholderName: "John Doe",
    isDefault: true,
    lastUsed: "2025-09-01",
    status: "active",
  },
  {
    id: "pm_2",
    type: "credit_card",
    cardNetwork: "Mastercard",
    cardNumber: "1887",
    expiryDate: "08/24",
    cardholderName: "John Doe",
    isDefault: false,
    lastUsed: "2025-07-15",
    status: "active",
  },
  {
    id: "pm_3",
    type: "credit_card",
    cardNetwork: "American Express",
    cardNumber: "3012",
    expiryDate: "06/26",
    cardholderName: "John Doe",
    isDefault: false,
    lastUsed: "2025-05-02",
    status: "active",
  },
  {
    id: "pm_4",
    type: "paypal",
    cardNumber: "john.doe@email.com",
    expiryDate: "",
    cardholderName: "John Doe",
    isDefault: false,
    lastUsed: "2025-02-14",
    status: "active",
  },
];

const rows: PaymentRow[] = [
  {
    id: "1",
    transactionDate: "2025-09-01 07:58 PM",
    invoiceId: "INV-2025-091-001",
    paymentMethod: "Mastercard **** 1887",
    type: "Subscription",
    plan: "Growth Plan",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "2",
    transactionDate: "2025-08-01 08:03 PM",
    invoiceId: "INV-2025-081-002",
    paymentMethod: "Visa **** 4421",
    type: "Subscription",
    plan: "Scale Plan",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "3",
    transactionDate: "2025-07-15 10:12 AM",
    invoiceId: "INV-2025-071-003",
    paymentMethod: "Amex **** 3012",
    type: "Add-on Credits",
    plan: "Custom Plan",
    currency: "USD",
    invoiceAmount: 120,
    serviceProvider: "Stripe",
  },
  {
    id: "4",
    transactionDate: "2025-06-04 11:00 AM",
    invoiceId: "INV-2025-061-004",
    paymentMethod: "UPI **** 3289",
    type: "Subscription",
    plan: "Growth Plan",
    currency: "INR",
    invoiceAmount: 5499,
    serviceProvider: "Razorpay",
  },
  {
    id: "5",
    transactionDate: "2025-05-02 05:34 PM",
    invoiceId: "INV-2025-051-005",
    paymentMethod: "PayPal john.doe@email.com",
    type: "Subscription",
    plan: "Scale Plan",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "PayPal",
  },
  {
    id: "6",
    transactionDate: "2025-04-17 09:27 AM",
    invoiceId: "INV-2025-041-006",
    paymentMethod: "Visa **** 9301",
    type: "Add-on Credits",
    plan: "Custom Plan",
    currency: "USD",
    invoiceAmount: 220,
    serviceProvider: "Stripe",
  },
  {
    id: "7",
    transactionDate: "2025-03-01 08:01 PM",
    invoiceId: "INV-2025-031-007",
    paymentMethod: "Mastercard **** 1887",
    type: "Subscription",
    plan: "Growth Plan",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "8",
    transactionDate: "2025-02-14 01:43 PM",
    invoiceId: "INV-2025-021-008",
    paymentMethod: "NetBanking ICICI",
    type: "Add-on Credits",
    plan: "Scale Plan",
    currency: "INR",
    invoiceAmount: 2999,
    serviceProvider: "Razorpay",
  },
];

function downloadInvoice(row: PaymentRow) {
  const lines = [
    "Invoice",
    "------------------------------",
    `Invoice ID: ${row.invoiceId}`,
    `Date: ${row.transactionDate}`,
    `Payment Method: ${row.paymentMethod}`,
    `Type: ${row.type}`,
    `Plan: ${row.plan}`,
    `Currency: ${row.currency}`,
    `Amount: ${row.invoiceAmount}`,
    `Service Provider: ${row.serviceProvider}`,
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${row.invoiceId}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parsePaymentDate(input: string): Date | null {
  const m = input.match(
    /(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i,
  );
  if (!m) return null;
  const [_, y, mo, d, hh, mm, ap] = m;
  let hour = parseInt(hh, 10);
  const minute = parseInt(mm, 10);
  if (/pm/i.test(ap) && hour !== 12) hour += 12;
  if (/am/i.test(ap) && hour === 12) hour = 0;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d), hour, minute, 0);
  if (isNaN(dt.getTime())) return null;
  return dt;
}

type SortField =
  | "transactionDate"
  | "invoiceId"
  | "paymentMethod"
  | "type"
  | "plan"
  | "currency"
  | "invoiceAmount"
  | "serviceProvider";

type SortDir = "asc" | "desc";

function getCardIcon(paymentMethod: PaymentMethod) {
  if (paymentMethod.type === "paypal") {
    return "🅿️";
  } else if (paymentMethod.type === "credit_card" || paymentMethod.type === "debit_card") {
    switch (paymentMethod.cardNetwork) {
      case "Visa":
        return "💳";
      case "Mastercard":
        return "💳";
      case "American Express":
        return "💳";
      default:
        return "💳";
    }
  }
  return "💳";
}

function getCardColor(cardNetwork?: string) {
  switch (cardNetwork) {
    case "Visa":
      return "from-blue-600 to-blue-700";
    case "Mastercard":
      return "from-red-600 to-orange-600";
    case "American Express":
      return "from-blue-800 to-cyan-700";
    default:
      return "from-gray-600 to-gray-700";
  }
}

function PaymentMethodCard({
  method,
  onDelete,
  onSetDefault,
}: {
  method: PaymentMethod;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden h-56 bg-gradient-to-br ${getCardColor(method.cardNetwork)} text-white shadow-lg hover:shadow-xl transition-shadow`}
      >
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>

        <div className="relative p-6 flex flex-col h-full justify-between">
          <div className="flex items-start justify-between">
            <div className="text-2xl">{getCardIcon(method)}</div>
            {method.isDefault && (
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Default</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-75 mb-1">Cardholder Name</p>
              <p className="text-base font-semibold">{method.cardholderName}</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm opacity-75 mb-1">Card Number</p>
                <p className="text-xl font-mono tracking-wider">
                  •••• •••• •••• {method.cardNumber}
                </p>
              </div>
              {method.type !== "paypal" && (
                <div className="text-right">
                  <p className="text-xs opacity-75 mb-1">Expires</p>
                  <p className="font-mono font-semibold">{method.expiryDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            {method.status === "active" && (
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </span>
            )}
            {method.status === "expired" && (
              <span className="flex items-center gap-1 text-red-600">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                Expired
              </span>
            )}
            {method.status === "inactive" && (
              <span className="flex items-center gap-1 text-gray-400">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
                Inactive
              </span>
            )}
          </div>
          <div className="text-gray-500">
            Last used: {method.lastUsed}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {!method.isDefault && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSetDefault(method.id)}
            >
              Set as Default
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className={method.isDefault ? "w-full" : ""}
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment method? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-50 p-3 rounded-lg my-4">
            <p className="text-sm font-semibold text-gray-900">
              {method.cardNetwork || "PayPal"} •••• {method.cardNumber}
            </p>
            <p className="text-xs text-gray-600 mt-1">{method.cardholderName}</p>
          </div>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(method.id);
                setDeleteOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function Payments() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("transactionDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [paymentMethodsList, setPaymentMethodsList] =
    useState<PaymentMethod[]>(paymentMethods);

  const uniqueTypes = useMemo(
    () => Array.from(new Set(rows.map((r) => r.type))).sort(),
    [],
  );

  const uniquePlans = useMemo(
    () => Array.from(new Set(rows.map((r) => r.plan))).sort(),
    [],
  );

  const [dateRange, setDateRange] = useState<
    { from: Date | undefined; to: Date | undefined } | undefined
  >();
  const [pickerValue, setPickerValue] = useState<[Date, Date] | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q
        ? [r.invoiceId, r.paymentMethod, r.type, r.plan, r.serviceProvider]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;

      const matchesType = typeFilter === "all" ? true : r.type === typeFilter;
      const matchesPlan = planFilter === "all" ? true : r.plan === planFilter;

      let inRange = true;
      if (dateRange?.from && dateRange?.to) {
        const dt = parsePaymentDate(r.transactionDate);
        if (!dt) return false;
        const t = dt.getTime();
        inRange = t >= dateRange.from.getTime() && t <= dateRange.to.getTime();
      }

      return matchesQuery && matchesType && matchesPlan && inRange;
    });
  }, [query, typeFilter, planFilter, dateRange]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      const getVal = (r: PaymentRow) => {
        switch (sortField) {
          case "transactionDate": {
            const da = parsePaymentDate(r.transactionDate)?.getTime() ?? 0;
            return da;
          }
          case "invoiceAmount":
            return r.invoiceAmount;
          case "invoiceId":
            return r.invoiceId.toLowerCase();
          case "paymentMethod":
            return r.paymentMethod.toLowerCase();
          case "type":
            return r.type.toLowerCase();
          case "plan":
            return r.plan.toLowerCase();
          case "currency":
            return r.currency.toLowerCase();
          case "serviceProvider":
            return r.serviceProvider.toLowerCase();
        }
      };
      const va = getVal(a);
      const vb = getVal(b);

      if (typeof va === "number" && typeof vb === "number") {
        cmp = va - vb;
      } else {
        const sa = String(va);
        const sb = String(vb);
        cmp = sa.localeCompare(sb);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const resetFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setPlanFilter("all");
    setDateRange(undefined);
    setPickerValue(null);
  };

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethodsList((prev) =>
      prev.filter((pm) => pm.id !== id)
    );
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethodsList((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const HeaderSort = ({
    label,
    field,
    alignRight,
  }: {
    label: string;
    field: SortField;
    alignRight?: boolean;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="group flex items-center justify-between gap-2 text-left hover:text-valasys-orange w-full h-full px-4 py-2 cursor-pointer"
    >
      <span>{label}</span>
      <div className="flex-shrink-0">
        {sortField === field ? (
          sortDir === "asc" ? (
            <ArrowUp className="w-3.5 h-3.5 text-valasys-orange" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 text-valasys-orange" />
          )
        ) : (
          <span className="opacity-40 group-hover:opacity-70">↕</span>
        )}
      </div>
    </button>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-valasys-gray-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-valasys-orange" /> Payments
            </h1>
            <p className="text-sm text-valasys-gray-600">
              Manage your payment methods and view transaction history.
            </p>
          </div>
        </div>

        <Tabs defaultValue="payment-methods" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payment-methods">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="payment-history">
              <Download className="w-4 h-4 mr-2" />
              Payment History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Saved Payment Methods</CardTitle>
                  <Button className="bg-valasys-orange hover:bg-valasys-orange/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {paymentMethodsList.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No payment methods saved</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Add a payment method to get started
                    </p>
                    <Button className="bg-valasys-orange hover:bg-valasys-orange/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paymentMethodsList.map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        method={method}
                        onDelete={handleDeletePaymentMethod}
                        onSetDefault={handleSetDefaultPaymentMethod}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-history" className="space-y-6">
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2 text-valasys-orange" />
                  Search & Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="w-full flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search invoices, methods, provider..."
                        className="pl-10"
                        aria-label="Search payments"
                      />
                    </div>
                  </div>
                  <div className="w-full flex-1">
                    <RsuiteDateRangePicker
                      value={pickerValue as any}
                      onChange={(val) => setPickerValue(val as any)}
                      onOk={(val) => {
                        setPickerValue(val as any);
                        if (val && Array.isArray(val)) {
                          setDateRange({ from: val[0], to: val[1] });
                        }
                      }}
                      onClean={() => {
                        setPickerValue(null);
                        setDateRange(undefined);
                      }}
                      placeholder="MM/DD/YYYY - MM/DD/YYYY"
                      format="MM/dd/yyyy"
                      character=" - "
                      placement="leftStart"
                      showOneCalendar={false}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="w-full flex-1">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full flex-1">
                    <Select value={planFilter} onValueChange={setPlanFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Plans" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        {uniquePlans.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetFilters}
                    title="Reset filters"
                    aria-label="Reset filters"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-valasys-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="min-w-[180px]">
                          <HeaderSort
                            label="Transaction Date"
                            field="transactionDate"
                          />
                        </TableHead>
                        <TableHead className="min-w-[160px]">
                          <HeaderSort label="Invoice ID" field="invoiceId" />
                        </TableHead>
                        <TableHead className="min-w-[200px]">
                          <HeaderSort
                            label="Payment Method"
                            field="paymentMethod"
                          />
                        </TableHead>
                        <TableHead className="min-w-[140px]">
                          <HeaderSort label="Type" field="type" />
                        </TableHead>
                        <TableHead className="min-w-[140px]">
                          <HeaderSort label="Plan" field="plan" />
                        </TableHead>
                        <TableHead className="min-w-[120px]">
                          <HeaderSort label="Currency" field="currency" />
                        </TableHead>
                        <TableHead className="text-right min-w-[150px]">
                          <HeaderSort
                            label="Invoice Amount"
                            field="invoiceAmount"
                            alignRight
                          />
                        </TableHead>
                        <TableHead className="min-w-[160px]">
                          <HeaderSort
                            label="Service Provider"
                            field="serviceProvider"
                          />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sorted.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="text-sm text-gray-700">
                            {row.transactionDate}
                          </TableCell>
                          <TableCell className="font-mono text-sm flex items-center gap-2">
                            <button
                              className="inline-flex items-center gap-1 text-valasys-orange hover:underline"
                              onClick={() => downloadInvoice(row)}
                              aria-label={`Download invoice ${row.invoiceId}`}
                            >
                              {row.invoiceId}
                              <Download className="w-4 h-4" />
                            </button>
                          </TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {row.paymentMethod}
                          </TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {row.type}
                          </TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {row.plan}
                          </TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {row.currency}
                          </TableCell>
                          <TableCell className="text-right font-medium text-gray-900">
                            {row.currency === "USD"
                              ? `$${row.invoiceAmount.toLocaleString()}`
                              : `${row.invoiceAmount.toLocaleString()} ${row.currency}`}
                          </TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {row.serviceProvider}
                          </TableCell>
                        </TableRow>
                      ))}
                      {sorted.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-sm text-gray-500"
                          >
                            No transactions match your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
