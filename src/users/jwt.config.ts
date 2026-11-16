/**
 * Obtém o segredo JWT a partir das variáveis de ambiente.
 * Interrompe a inicialização se JWT_SECRET não estiver definido.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error(
      'Variável de ambiente JWT_SECRET ausente. Defina uma chave segura antes de iniciar a aplicação.',
    );
  }
  return secret;
}
