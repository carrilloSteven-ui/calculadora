import tkinter as tk
from tkinter import messagebox

# -------------------------------------------------------
# Clases de Operaciones (Orientadas a Objetos)
# -------------------------------------------------------



# -------------------------------------------------------
# Clase Calculadora (controlador OOP)
# -------------------------------------------------------

class Calculator:
    def __init__(self):
        self.operations = {
            "+": Addition(),
            "-": Subtraction(),
            "*": Multiplication(),
            "/": Division(),
        }

    def calculate(self, symbol, a, b):
        if symbol not in self.operations:
            raise ValueError("Operación no válida")
        return self.operations[symbol].execute(a, b)


# -------------------------------------------------------
# Interfaz gráfica en Tkinter (orientada a objetos)
# -------------------------------------------------------

class CalculatorGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora OOP")
        self.root.geometry("350x500")
        self.root.config(bg="#f1f2f6")

        self.calc = Calculator()

        # ------- Pantalla de la calculadora -------
        self.display = tk.Entry(root, font=("Arial", 24), justify="right", bd=8, relief="sunken")
        self.display.pack(fill="both", padx=10, pady=10, ipady=10)

        # Variables internas
        self.first_value = None
        self.operation = None

        self.create_buttons()

    # -------------------------------------------------------
    # Crear botones en grid
    # -------------------------------------------------------
    def create_buttons(self):

        frame = tk.Frame(self.root, bg="#f1f2f6")
        frame.pack(expand=True, fill="both")

        buttons = [
            ("7", self.write_number), ("8", self.write_number), ("9", self.write_number), ("/", self.set_operation),
            ("4", self.write_number), ("5", self.write_number), ("6", self.write_number), ("*", self.set_operation),
            ("1", self.write_number), ("2", self.write_number), ("3", self.write_number), ("-", self.set_operation),
            ("0", self.write_number), (".", self.write_number), ("=", self.calculate_result), ("+", self.set_operation),
            ("C", self.clear_display)
        ]

        row, col = 0, 0
        for text, cmd in buttons:
            button = tk.Button(
                frame,
                text=text,
                font=("Arial", 20),
                width=4,
                height=2,
                bg="#dcdde1",
                activebackground="#a4b0be",
                command=lambda t=text, c=cmd: c(t)
            )
            button.grid(row=row, column=col, padx=5, pady=5)

            col += 1
            if col > 3:
                col = 0
                row += 1

    # -------------------------------------------------------
    # Funciones de botones
    # -------------------------------------------------------
    def write_number(self, value):
        self.display.insert(tk.END, value)

    def set_operation(self, op):
        try:
            self.first_value = float(self.display.get())
            self.operation = op
            self.display.delete(0, tk.END)
        except ValueError:
            messagebox.showerror("Error", "Entrada inválida")

    def calculate_result(self, _=None):
        try:
            second_value = float(self.display.get())
            result = self.calc.calculate(self.operation, self.first_value, second_value)
            self.display.delete(0, tk.END)
            self.display.insert(0, str(result))
        except ZeroDivisionError:
            messagebox.showerror("Error", "No se puede dividir entre cero")
            self.clear_display()
        except Exception:
            messagebox.showerror("Error", "Operación inválida")
            self.clear_display()

    def clear_display(self, _=None):
        self.display.delete(0, tk.END)
        self.first_value = None
        self.operation = None


# -------------------------------------------------------
# Iniciar la App
# -------------------------------------------------------

if __name__ == "__main__":
    root = tk.Tk()
    app = CalculatorGUI(root)
    root.mainloop()
